import apolloClient from '../util/apollo';
import * as userGql from './user.graphql';
import { filterNullAndUndefined } from '../util/util.js';

window.userGql = userGql

export function getUserInfo() {
    return apolloClient.query({
        query: userGql.user
    })
}

export function updateUser(updateFields) {
    updateFields = filterNullAndUndefined(updateFields);
    return apolloClient.mutate({
        mutation: userGql.updateUser,
        variables: {
            updateFields
        },
        update: (cache, { data: { updateUser } }) => {
            if (updateUser) {
                const data = cache.readQuery({
                    query: userGql.user
                });
                data.user = {
                    ...data.user,
                    ...updateFields
                };
                // 更新store
                cache.writeQuery({
                    query: userGql.user,
                    data: data
                })
            }
        }
    })
}