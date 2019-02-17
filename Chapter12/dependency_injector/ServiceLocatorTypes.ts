interface ISystemSettings {
}

interface IMailService {
}

enum Interfaces {
    ISystemSettings,
    IMailService
}

class ServiceLocatorTypes {
    public static register(
        interfaceName: Interfaces, instance: any) {}
    public static resolve(
        interfaceName: Interfaces) {}
}

ServiceLocatorTypes.register(Interfaces.ISystemSettings, {});

ServiceLocatorTypes.resolve(Interfaces.ISystemSettings);
