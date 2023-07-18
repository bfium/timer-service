
function checkStatus(response){
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error);
        throw error;
    }
}

function parseJSON(response){
    return response.json();
}
class ClientProxy {
    getTimers=(success) =>{
        return fetch('/api/timers', {
            headers: {
                Accept: 'application/json',
            },
        }).then(checkStatus)
            .then(parseJSON)
            .then(success);
    }

    createTimer=(data)=> {
        return fetch('/api/timers', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(checkStatus);
    }

    updateTimer=(data)=> {
        return fetch('/api/timers', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(checkStatus);
    }

    deleteTimer=(data)=> {
        return fetch('/api/timers', {
            method: 'delete',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(checkStatus);
    }

    startTimer=(data)=> {
        return fetch('/api/timers/start', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(checkStatus);
    }

    stopTimer=(data)=> {
        return fetch('/api/timers/stop', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(checkStatus);
    }

}
export default ClientProxy;