const data = {
    username : 'ranjan',
    password : 'ranjan123',
}
function authenticateUser(input) {
    if (input.username === data.username && input.password === data.password) {
        return { status: 'success', message: true };
    }
    return { status: 'error', message: false };           
}
export { authenticateUser };