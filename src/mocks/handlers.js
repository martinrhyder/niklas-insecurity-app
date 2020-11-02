import { rest } from 'msw';

const EXPECTED_ACCOUNT = {
    username: 'admin',
	email: 'admin@mail.com',
	password: 'abc123',
}

const ALL_ARTICLES = [
    {
        id: 1,
        author: 'admin',
        title: 'Top secret article',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc accumsan purus nec est gravida lobortis. Aliquam erat volutpat. In rhoncus at ligula ac venenatis. Nulla ac laoreet sapien. Vestibulum vitae eleifend magna. Nunc et mollis nisi, nec dictum tellus. Suspendisse convallis augue at fermentum faucibus. Donec mattis commodo elementum. Nunc et erat quis sem interdum convallis vitae quis massa. Proin rhoncus nunc a vehicula feugiat. Cras et vehicula arcu, sit amet rutrum velit. Nam eros metus, tincidunt eleifend sollicitudin id, venenatis non orci.',
    },
    {
        id: 2,
        author: 'admin',
        title: 'Super secret article',
        body: 'Fusce efficitur varius dolor id porttitor. Curabitur dui enim, auctor nec justo eu, pretium semper eros. Maecenas luctus eu eros nec maximus. Ut dignissim blandit ipsum. Aenean odio ipsum, pretium a urna nec, cursus lacinia justo. Nunc ullamcorper, nunc eu rhoncus blandit, quam ex facilisis diam, at lacinia ante mi non leo. Sed vitae elit efficitur, tincidunt orci nec, bibendum urna. Praesent ut venenatis arcu. Integer nec ligula venenatis, pulvinar nibh eget, posuere urna.',
    },
    {
        id: 3,
        author: 'president',
        title: 'Super mega top secret article',
        body: 'Cras rhoncus tincidunt purus, ut iaculis leo hendrerit quis. Praesent lobortis tellus iaculis, lacinia nunc nec, sagittis lorem. Donec dui mi, tempus non purus ut, elementum vehicula risus. Suspendisse luctus cursus quam, et placerat tellus. Suspendisse ex justo, posuere eu gravida non, dignissim eget neque. Sed vitae consequat ex, quis posuere dolor. Maecenas sit amet scelerisque nisi, vel feugiat tellus. Aenean in molestie mauris. Cras aliquet dictum urna at posuere. In iaculis velit lorem, et porta tortor interdum ut. Nam quis metus at ipsum porta condimentum. Etiam vel dolor ac mi varius elementum. Nunc convallis mi id nisi posuere tincidunt. Aliquam purus justo, volutpat sit amet fermentum a, ultrices quis est.',
    },
]

export const handlers = [
    rest.post('/login', (req, res, ctx) => {
        const email = req?.body?.email;
        const password = req?.body?.password;

        if (password === EXPECTED_ACCOUNT.password && email === EXPECTED_ACCOUNT.email) {
            sessionStorage.setItem('is-authenticated', true)
            return res(
                ctx.status(200),
            )
        } else {
            return res(
                ctx.status(403),
                ctx.json({
                    errorMessage: 'Not authorized',
                }),
            )
        }
    }),
    rest.post('/logout', (req, res, ctx) => {
        sessionStorage.setItem('is-authenticated', '');
        return res(
            ctx.status(200),
        )
    }),
    rest.get('/user', (req, res, ctx) => {
        const isAuthenticated = sessionStorage.getItem('is-authenticated')
        if (!isAuthenticated) {
            return res(
                ctx.status(403),
                ctx.json({
                    errorMessage: 'Not authorized',
                }),
            )
        }

        return res(
            ctx.status(200),
            ctx.json({
                username: 'admin',
            }),
        )
    }),
    rest.post('/articles', (req, res, ctx) => {
        const username = req?.body?.username;

        if (!username) {
            return res(
                ctx.status(403),
            )
        }

        return res(
            ctx.status(200),
            ctx.json({
                articles: ALL_ARTICLES.filter((article) => article.author === username),
            }),
        )
    }),
    rest.post('/article', (req, res, ctx) => {
        const id = req?.body?.id;

        if (!id) {
            return res(
                ctx.status(403),
            )
        }

        const article = ALL_ARTICLES.filter((article) => article.id === parseInt(id));
        
        return res(
            ctx.status(200),
            ctx.json(article ? article[0] : null),
        )
    }),
]