export default defineEventHandler (async (event) => {
    try {
        const files = await uploadModel.find()
        if (!files) {
            return createError({
                statusCode: 400,
                statusMessage: 'Files are empty.'
            })
        }
        return files        
    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: 'Something went wrong with the your api.'
        })
    }
})
