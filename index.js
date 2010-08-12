Ext.setup({
    tabletStartupScreen: 'tabletStartupScreenstartup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {

        Ext.regModel('Card', {
            fields: ['content', 'cls']
        });

		var store = new Ext.data.Store({
            model: 'Card',
            proxy: {
                type: 'ajax',
                url: 'mock/get-expense.php',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            },
            listeners: {
                datachanged: function(){
					alert(0);
                }
            }    
        });
        store.read();

        /*Ext.Ajax.request({
            url: 'mock/get-expense.php',
            success: function(response, opts) {
				alert(response.responseText);
                var obj = Ext.decode(response.responseText);
                console.dir(obj);
            },
            failure: function(response, opts) {
				console.log('server-side failure with status code ' + response.status);
            }
        });*/

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

        var store = new Ext.data.JsonStore({
            // store configs
            autoDestroy: true,
            storeId: 'expense-item-store',

            proxy: {
                type: 'ajax',
                url: 'mock/get-expenses.php',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            },

            model: 'ExpenseItem',
        });

        var expenses = new Ext.List({
            itemId: 'expense-list',
            tpl: '	<tpl for=".">\
						<div class="expense-item">\
							<div style="display: none;">{date}</div>\
							<div class="description">{description}</div>\
							<div class="price">{price}</div>\
							<div class="meta">Shared with: {sharing} friends</div>\
						</div>\
					</tpl>',
            itemSelector: 'div.expense-item',

            singleSelect: true,
            indexBar: false,
            grouped: true,
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
                    return record.get('date');
                },

                data: [
                {
                    description: 'Pizza',
                    price: '2502.00',
                    sharing: '2',
                    date: new Date().format('Y-m-d')
                },
                {
                    description: 'Lunch',
                    price: '100.00',
                    sharing: '0',
                    date: new Date().format('Y-m-d')
                },
                {
                    description: 'Snacks',
                    price: '40.00',
                    sharing: '1',
                    date: new Date().format('Y-m-d')
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
            }]
        });

        var expenseItem;

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
                        form.updateModel(expenseItem);
                        expenses.getStore().add(expenseItem);
                        overlay.hide();
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
                    expenseItem = Ext.ModelMgr.create({
                        date: new Date().format('Y-m-d')
                    },
                    'ExpenseItem');
                    overlay.setCentered(true).show();
                    form.loadModel(expenseItem);
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
                id: 'tab-dashboard',
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