export function createObject<T, AT>(args: AT): T {
    const fields = Object.keys(args)
    const object = <T>(new Object());

    fields.forEach(field => {
        object[field] = args[field]
    });

    return object;
}