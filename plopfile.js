module.exports = function (plop) {
    // controller generator
    plop.setGenerator('new-package', {
        description: 'Create a new package inside packages folder',
        prompts: [
            {
                type: 'input',
                name: 'packageName',
                message: 'Package name: ',
            },
        ],
        actions: [
            {
                type: 'addMany',
                destination: 'packages/{{packageName}}',
                templateFiles: 'templates/new-package/**/*.hbs',
                base: 'templates/new-package/',
            },
        ],
    });
};
