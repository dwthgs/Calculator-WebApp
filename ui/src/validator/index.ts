export function validName(name: string) {
    let validNamePattern = new RegExp("^[A-Za-z]\\w{2,}$");
    if (validNamePattern.test(name)){
        return true;
    }
    return false;
}

export function validPassword(password: string) {
    let validPasswordPattern = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")
    if (validPasswordPattern.test(password)){
        return true;
    }
    return false;
}