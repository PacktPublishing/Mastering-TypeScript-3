// JavaScript style of declaring a Backbone Model

// var NoteModel = Backbone.Model.extend ( 
//     {
//         initialize: function() {
//             console.log("NoteModel initialized.");
//         },
//         author: function() {},
//         coordinates : function() {},
//         allowedToEdit: function(account: any) {
//             return true;
//         }
//     }
// );

interface INoteModel {
    initialize() : void;
    author() : void;
    coordinates() : void;
    allowedToEdit(account: any): boolean;
}

class NoteModel extends Backbone.Model implements INoteModel {
    initialize() {
        console.log(`NodeModel initialized`);
    }
    author() {}
    coordinates() {}
    allowedToEdit(account: any) : boolean {
        return true;
    }
}

class NoteCollection extends Backbone.Collection<NoteModel> {
    model = NoteModel;
}

interface ISimpleModel {
    name: string;
    id: number;
}

class SimpleModel extends Backbone.Model implements ISimpleModel {
    get name() {
        return this.get('name');
    }
    set name(value: string) {
        this.set('name', value);
    }
    get id() : number {
        return this.get('id');
    }
    set id(value: number) {
        this.set('id', value);
    }
}