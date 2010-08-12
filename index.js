Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {

        Ext.regModel('ExpenseItem', {
            fields: [
            {
                name: 'description',
                type: 'string'
            },

            {
                name: 'price',
                type: 'string'
            },

            {
                name: 'date',
                type: 'string'
            },

            {
                name: 'sharing',
                type: 'string'
            }]
        });

        var expenses = new Ext.List({
            itemId: 'expense_list',
            tpl: '	<tpl for=".">\
						<div class="expense-item">\
							<div class="description">{description}</div>\
							<div class="price">{price}</div>\
							<div class="meta">{date} | Shared with: {sharing} friends</div>\
						</div>\
					</tpl>',
            itemSelector: 'div.expense-item',

            singleSelect: true,
            indexBar: false,
            grouped: false,
            fullscreen: true,

            disclosure: {
                scope: 'test',
                handler: function(record, btn, index) {
                    alert('Disclose more info for ' + record.get('description'));
                }
            },

            store: new Ext.data.Store({
                model: 'ExpenseItem',
                sorters: 'description',

                getGroupString: function(record) {
                    return record.get('description')[0];
                },

                data: [
                {
                    description: 'Pizza',
                    price: '25023.00',
                    sharing: '2',
                    date: new Date().format('F d')
                },
                {
                    description: 'Lunch',
                    price: '100.00',
                    sharing: '0',
                    date: new Date().format('F d')
                },
                {
                    description: 'Snacks',
                    price: '40.00',
                    sharing: '1',
                    date: new Date().format('F d')
                }
                ]
            })
        });

        var form = new Ext.form.FormPanel({
            url: 'mock/add-expense.php',
            standardSubmit: false,
            items: [{
                xtype: 'fieldset',
                title: 'New Expense',
                instructions: 'Please enter the information above.',
                defaults: {
                    required: true,
                    labelAlign: 'left'
                },
                items: [{
                    xtype: 'textfield',
                    name: 'description',
                    label: 'Description'
                },
                {
                    xtype: 'textfield',
                    name: 'price',
                    label: 'Price'
                },
                {
                    xtype: 'select',
                    name: 'sharing',
                    label: 'Share with',
                    options: [{
                        text: 'noone',
                        value: '0'
                    },
                    {
                        text: '1 friend',
                        value: '1'
                    },
                    {
                        text: '2 friends',
                        value: '2'
                    },
                    {
                        text: '3 friends',
                        value: '3'
                    },
                    {
                        text: '4 friends',
                        value: '4'
                    },
                    {
                        text: '5 friends',
                        value: '5'
                    }]
                },
                {
                    xtype: 'textfield',
                    name: 'date',
                    label: 'Date'
                }]
            }],
            listeners: {
                submit: function(form, result) {
                    alert('form was submitted');
                },
                exception: function(form, result) {
                    alert('there was an error: ' + result);
                }
            }
        });

        var overlay = new Ext.Panel({
            floating: true,
            modal: true,
            centered: false,
            width: Ext.platform.isPhone ? 280: 400,
            height: Ext.platform.isPhone ? 320: 400,
            styleHtmlContent: true,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                layout: {
                    pack: 'center'
                },
                items: [{
                    ui: 'action',
                    text: 'Save',
                    handler: function() {
                        form.submit({
                            waitMsg: {
                                message: 'Submitting',
                                cls: 'demos-loading'
                            }
                        });
                    }
                },
                {
                    text: 'Cancel',
                    handler: function() {
                        overlay.hide();
                    }
                }]
            }],
            scroll: 'vertical',
            cls: 'htmlcontent',
            items: form
        });

        var dashboardItems = [{
            xtype: 'toolbar',
            dock: 'top',
            scroll: 'horizontal',
            layout: {
                pack: 'left'
            },
            items: [
            {
                ui: 'mask',
                iconCls: 'add',
                handler: function() {

                    overlay.setCentered(true).show();
                    var expenseItem = Ext.ModelMgr.create({
                        description: 'Model entry',
                        price: 100,
                        sharing: '2',
                        date: new Date().format('F d')
                    },
                    'ExpenseItem');

                    form.load(expenseItem);
                }
            }]
        }];

        var tabpanel = new Ext.TabPanel({
            tabBar: {
                dock: 'bottom',
                layout: {
                    pack: 'center'
                }
            },
            defaults: {
                scroll: 'vertical'
            },
            fullscreen: true,
            ui: 'dark',
            animation: {
                type: 'slide',
                cover: true
            },
            items: [{
                id: 'tab_dashboard',
                title: 'Dashboard',
                iconCls: 'info',
                cls: 'card1',
                dockedItems: dashboardItems,
                items: expenses
            },
            {
                title: 'Expenses',
                html: '<h1>Expenses</h1>',
                iconCls: 'favorites',
                cls: 'card2',
                badgeText: '4'
            },
            {
                title: 'Friends',
                html: '<h1>Friends</h1>',
                cls: 'card5',
                iconCls: 'user',
                badgeText: '1'
            },
            {
                title: 'Settings',
                html: '<h1>Settings</h1>',
                cls: 'card4',
                iconCls: 'settings'
            }]
        });
    }
});