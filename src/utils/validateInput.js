export function validInput(name, description) {
    if (!/^[a-åA-Å0-9]+$/.test(name)) {
        alert(`The name can only contain letters and numbers`);
        return;
    }

    if (name.length < 2 || description.length < 2) {
        alert(`The name and description must have at least 2 characters`);
        return;
    }
}