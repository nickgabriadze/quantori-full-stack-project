export function calculateTimeRemaining(expirationDate) {
    const now = new Date();
    const expiration = new Date(expirationDate);
    const timeDifference = expiration - now;

    if (timeDifference < 0) {
        return "Expired";
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);


    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}