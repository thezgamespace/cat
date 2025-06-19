  const _SETTINGS = {

    "Apk":false,
    'Gear': {
        'Enabled': true,
        'Link': 'https://youtube.com',
        'NewWindow': true,
    },
    'MoreGames': {
        'Enabled': true,
        'Link': 'https://google.com',
        'NewWindow': false,
    },
    'Splash': [
        {
            'Duration': 1,
            'Enabled': false,
            'clickable': true,
            'Link': 'https://google.com',
            'NewWindow': true,
            'Text': "",

        },
        {
            'Duration': 1,
            'Enabled': false,
            'clickable': true,
            'Link': 'https://youtube.com',
            'NewWindow': true,
            'Text': "",
        },

    ]


}
module.exports = {
    _SETTINGS: _SETTINGS
};
