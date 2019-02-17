import { ISystemSettings } from './SystemSettings';
import { IMailServiceDi } from './MailServiceDi';

export type IRegisteredClassesGeneric = ISystemSettings | IMailServiceDi | undefined;

export class ServiceLocatorGeneric {
    static registeredClasses: Map<string, IRegisteredClassesGeneric>;
    static initialised: boolean = false;
    static init() {
        this.registeredClasses = new Map<string, IRegisteredClassesGeneric>();
        this.initialised = true;
    }

    public static register<T>(t: { new(): T }, instance: IRegisteredClassesGeneric)
        : void {
        if (!this.initialised) {
            this.init();
        }
        let interfaceInstance = new t();
        let interfaceName = interfaceInstance.constructor.name;
        console.log(`ServiceLocator registering : ${interfaceName}`);

        this.registeredClasses.set(interfaceName, instance);
    }
public static resolve<T>(t: { new(): T }): IRegisteredClassesGeneric {
    let interfaceInstance = new t();
    let interfaceName = interfaceInstance.constructor.name;
    console.log(`ServiceLocator resolving : ${interfaceName}`);
    return this.registeredClasses.get(interfaceName);
}

}