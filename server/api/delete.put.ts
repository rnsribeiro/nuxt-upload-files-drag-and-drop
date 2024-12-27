export default defineEventHandler(async (event) => {
    try {
        const { id, fileName } = await readBody(event)
        await uploadModel.findByIdAndDelete(id)
        await useStorage().removeItem(`fs:${fileName}`)
        return 200
    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: 'Something went wrong with the your api.'
        })
    }
})