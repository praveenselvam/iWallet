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
            model: 'ExpenseItem',
            sorters: 'description',
            autoDestroy: true,
            storeId: 'myStore',
			autoLoad: true,
			autoSave: true,

            getGroupString: function(record) {
                return record.get('date');
            },

            proxy: {
                type: 'ajax',
                url: 'mock/get-expense.php',
				/*api: {
				    create: 'mock/create-expense.php',
				    read: 'mock/read-expense.php',
				    update: 'mock/update-expense.php',
				    destroy: 'mock/destroy-expense.php',
				    save: 'mock/save-expense.php'
				},*/
                reader: {
                    type: 'json',
                    root: 'items',
                    idProperty: 'name'
                }
            },
        });

		setTimeout(function(){
			
			store.getAt(0).set('description', 'new');
			
			store.add(Ext.ModelMgr.create({
                description: 'sample',
				price: '200.00',
				sharing: '3',
				date: new Date().format('Y-m-d')
            }, 'ExpenseItem'));

			store.add(Ext.ModelMgr.create({
                description: 'rer',
				price: '300.00',
				sharing: '1',
				date: new Date().format('Y-m-d')
            }, 'ExpenseItem'));


			//store.save();
			
		}, 2000);
	
    }
});