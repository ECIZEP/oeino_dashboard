import apolloClient from '../util/apollo';
import * as category from './category.graphql';

export function getCategory() {
    return apolloClient.query({
        query: category.getCategory
    })
}

export function addCategory(categoryName) {
    return apolloClient.mutate({
        mutation: category.createCategory,
        variables: {
            categoryName
        }
    })
}

export function updateCategory(categoryId, categoryName) {
    return apolloClient.mutate({
        mutation: category.updateCategory,
        variables: {
            categoryId,
            categoryName
        }
    })
}

export function deleteCategory(categoryId) {
    return apolloClient.mutate({
        mutation: category.deleteCategory,
        variables: {
            categoryId
        }
    })
}