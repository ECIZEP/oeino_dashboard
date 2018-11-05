import { ApolloClient, HttpLink, InMemoryCache, from } from 'apollo-boost';
import { onError } from 'apollo-link-error';

const httpLink = new HttpLink({
    // 你需要在这里使用绝对路径
    uri: 'http://oeino.cn/graphql',
})

const errorLink = onError((error) => {
    const { graphQLErrors, networkError } = error;
    console.log(error);
    if (graphQLErrors) {
        graphQLErrors.map(({ extensions, message, locations, path }) => {
            const { code, exception } = extensions;
            switch(code) {
                case 'NOT_LOGIN':
                    window.location.href = exception.loginUrl + '?returnUrl=' + encodeURIComponent(location.href);
                    break;
            }
            console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
    }
    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
})

// 创建 apollo 客户端
const apolloClient = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
    
})

export default apolloClient;