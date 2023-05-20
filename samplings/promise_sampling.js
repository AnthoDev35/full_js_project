class HttpRequest {
    static makeRequest(url, method, isJSON = false) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    if (isJSON) {
                        const response = JSON.parse(xhr.responseText);
                        if (response.error && response.error == 'true') { // si le JSON contient error et que error contient "true"
                            reject(new Error(response.message)); // on renvoi le message contenu dans le json en rejetant la promesse
                        } else {
                            resolve(response.datas); // sinon oin envoi ce qsue contient "datas" du json
                        }
                    }
                    else {
                        resolve(xhr.responseText);
                    }
                } else {
                    reject(new Error('Erreur de requête : ' + xhr.statusText));
                }
            };

            xhr.onerror = function () {
                reject(new Error('Erreur de réseau'));
            };

            xhr.send();
        });
    }
}

    // Exemple d'utilisation
    const apiUrl = 'https://api.example.com/data';
    HttpRequest.makeRequest(apiUrl, 'GET')
    .then(response => {
        console.log(response);
        // Faites quelque chose avec la réponse
    })
    .catch(error => {
        console.error(error);
        // Gérez l'erreur
    });

    //Dans cet exemple, HttpRequest fait référence à la classe que vous avez définie, et makeRequest est la méthode statique que vous appelez sur cette classe. Vous pouvez remplacer 'GET' par la méthode HTTP souhaitée ('POST', 'PUT', etc.) en fonction de vos besoins.
    //Assurez-vous de remplacer 'https://api.example.com/data' par l'URL réelle vers votre API ou ressource distante.
    //Cela vous permettra d'appeler la méthode makeRequest de la classe HttpRequest et de gérer la réponse ou les erreurs en utilisant les promesses.
