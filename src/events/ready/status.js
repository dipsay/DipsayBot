module.exports = (argument, client, handler) => {
    client.user.setActivity({
        name: 'Future Client',
    });
    client.user.setStatus('dnd');
};