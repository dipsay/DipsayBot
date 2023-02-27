module.exports = (client) => {
    client.user.setActivity({
        name: 'Future Client',
    });
    client.user.setStatus('dnd');
};
