const API_URL = 'https://koders-list-api.vercel.app/';

export function getKoders() {
    return fetch(`${API_URL}koders`)
        .then((response) => response.json())
        .then((data) => data.koders);
}

export function createKoder(koder) {
    return fetch(`${API_URL}koders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(koder),
    });
}

export function deleteKoder(id) {
    return fetch(`${API_URL}koders/${id}/delete`, {
        method: 'POST',
    });
}