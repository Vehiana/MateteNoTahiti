module.exports = {
    eq: function (v1, v2) {
        return v1 === v2;
    },
    
    formatDate: function (date) {
        return new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    formatPrice: function (price) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XPF'
        }).format(price);
    },
    
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + " ";
            new_str = str.substr(0, len);
            new_str = str.substr(0, new_str.lastIndexOf(" "));
            new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
            return new_str + '...';
        }
        return str;
    }
};
