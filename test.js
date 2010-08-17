var store;

Ext.setup({
    tabletStartupScreen: 'tabletStartupScreenstartup.png',
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

        store = new Ext.data.Store({
            count: 0,
            model: 'ExpenseItem',
            sorters: 'description',
            autoDestroy: true,
            storeId: 'myStore',
            autoLoad: true,

            getGroupString: function(record) {
                return record.get('date');
            },

            proxy: {
                type: 'ajax',
                url: 'rest/app.php/expenses',
				method: 'POST',
				noCache: false,
				/*actionMethods: {
					create: 'POST',
					read: 'GET',
					update: 'PUT',
					destroy: 'DELETE'
				},*/
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

        setTimeout(function() {

            store.removeAt(0);

            store.getAt(0).set('description', 'new');

            store.add(Ext.ModelMgr.create({
                description: 'sample',
                price: '200.00',
                sharing: '3',
                date: new Date().format('Y-m-d')
            },
            'ExpenseItem'));

            store.add(Ext.ModelMgr.create({
                description: 'rer',
                price: '300.00',
                sharing: '1',
                date: new Date().format('Y-m-d')
            },
            'ExpenseItem'));

			store.sync();

            return;

        },
        2000);

    }
});