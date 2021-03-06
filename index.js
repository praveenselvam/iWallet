Ext.setup({
    tabletStartupScreen: 'tabletStartupScreenstartup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {

        Ext.regModel('ExpenseItem', {
            fields: [
            {
                name: 'id',
                type: 'string'
            },
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

        var store = new Ext.data.Store({
            count: 0,
            model: 'ExpenseItem',
            autoDestroy: true,
            storeId: 'myStore',
            autoLoad: true,
            autoSave: true,

            getGroupString: function(record) {
                return record.get('date');
            },

            proxy: {
                type: 'ajax',
                url: 'rest/app.php/expenses',
				actionMethods: {
					create: 'POST',
					read: 'GET',
					update: 'PUT',
					destroy: 'DELETE'
				},
                reader: {
                    type: 'json',
                    root: 'items',
                    idProperty: 'name'
                },
				/*extraParams: {
					foo: 'bar'
				},*/
                afterRequest: function() {
                    if (0 == store.count++) {
                        store.each(function(rec) {
                            rec.phantom = false;
                        });
                    }
                }
            }
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

            /*disclosure: {
                scope: 'test',
                handler: function(record, btn, index) {
                    alert('Disclose more info for ' + record.get('description'));
                }
            },*/

            store: store
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
            },
			{
                ui: 'mask',
                iconCls: 'action',
                handler: function() {
					store.sync();
                }
            }]
        }];

		var panel = new Ext.Panel({
			
			layout: 'fit',
			fullscreen: true,
            items: [new Ext.Carousel({
				items: [{
					xtype: 'panel',
					layout: 'fit',
		            dockedItems: dashboardItems,
					items: expenses
				},
				{
					xtype: 'panel',
					layout: 'fit'
				}]
			})]
			
		});
    }
});