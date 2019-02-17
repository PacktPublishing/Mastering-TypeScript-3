Ext.application(
    {
        name: 'SampleApp',
        appFolder: '/code/sample',
        controllers: ['SampleController'],
        launch: () => {

            Ext.create('Ext.container.Viewport', {
                layout: 'fit',
                items: [{
                    xtype: 'panel',
                    title: 'Sample App',
                    html: 'This is a Sample Viewport'
                }]
            });

        }

    }
    );

Ext.application(
   <Ext.app.IApplication> {
       // this JavaScript block is strongly
       // type to be of Ext.app.IApplication
    }
);