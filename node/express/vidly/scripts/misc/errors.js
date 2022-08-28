function throw400(response, message){
    response.status(400).send(message);
}

function throw404(response, message){
    response.status(404).send(message);
}

module.exports = {
    400: throw400,
    404: throw404
}