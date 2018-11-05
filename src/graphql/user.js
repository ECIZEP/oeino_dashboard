import apolloClient from '../util/apollo';
import * as userGql from './user.graphql';

export function getUserInfo() {
    return apolloClient.query({
        query: userGql.user
    })
}