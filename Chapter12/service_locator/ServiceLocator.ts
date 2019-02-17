import { ISystemSettings } from './SystemSettings';

export type IRegisteredClasses = ISystemSettings | undefined;

export class ServiceLocator {
    static registeredClasses: Map<string, IRegisteredClasses>;
    static initialised: boolean = false;
    static init() {
        this.registeredClasses = new Map<string, IRegisteredClasses>();
        this.initialised = true;
    }

    public static register(interfaceName: string, instance: IRegisteredClasses)
        : void {
        if (!this.initialised) {
            this.init();
        }

        this.registeredClasses.set(interfaceName, instance);
    }
    public static resolve(interfaceName: string): IRegisteredClasses {
        return this.registeredClasses.get(interfaceName);
    }
}