Ext.setup({
    tabletStartupScreen: 'tabletStartupScreenstartup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
	
		var store = new Ext.data.JsonStore({
            // store configs
            autoDestroy: true,
            storeId: 'myStore',

            proxy: {
                type: 'ajax',
                url: 'mock/get-expense.php',
                reader: {
                    type: 'json',
                    root: 'items',
                    idProperty: 'name'
                }
            },

            //alternatively, a Ext.data.Model name can be given (see Ext.data.Store for an example)
            fields: ['description', 'price', 'date', 'sharing']

        });
        store.read();
	
    }
});