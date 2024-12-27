<script lang="ts" setup>
import FileDialog from '~/components/FileDialog.vue';

interface IUploadedFiles {
    _id: string,
    path: string,
    fileName: string,
    fileType: string   
}

useHead({
    bodyAttrs: {
        class: 'bg-cyan-300'
    }
})

// Tornar os dados reativos
const uploadedFiles = ref<IUploadedFiles[]>([])

async function fetchFiles() {
    const { data } = await useFetch<IUploadedFiles[]>('/api/files')
    if (data.value) {
        uploadedFiles.value = data.value
    }
}

// Inicializar os dados
await fetchFiles()

const onDropZone = ref<HTMLDivElement>()
const { files } = useDropZone(onDropZone, { onDrop })

async function onDrop() {
    if (files.value) {
        const formData = new FormData()
        let isValid = false
        files.value.forEach((file) => {
            if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp') {
                formData.append('file', file, file.name.replaceAll(' ', '_').toLocaleLowerCase())
                isValid = true
            } else {
                console.log('Invalid file type')
                isValid = false
            }
        })

        if (isValid) {
            await $fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            await fetchFiles()
        }
    }    
}

async function handleDelete(id: string, fileName: string) {
    await $fetch('/api/delete', {
        method: 'PUT',
        body: {
            id,
            fileName
        }
    })
    await fetchFiles()
}

const { open, onChange } = useFileDialog()

onChange(async (files) => {
    let isValid = false
    const formData = new FormData()
    if (files) {
        for (let x = 0; x < files.length; x++) {
            if (files[x].type === 'image/jpeg' || files[x].type === 'image/png' || files[x].type === 'image/webp') {
                formData.append('file', files[x], files[x].name.replaceAll(' ', '_').toLocaleLowerCase())
                isValid = true
            } else {
                console.log('Invalid file type')
                isValid = false
            }
        }
        if (isValid) {            
            await $fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            await fetchFiles()
        }
    }
})

</script>

<template>
    <div class="p-6">
        <div
            ref="onDropZone"
            class="max-w-[900px] w-full border-dashed border-2 border-cyan-400 rounded-md p-4 text-lg font-medium text-center transition bg-cyan-200 cursor-pointer"
            @click="open()"
        >
            <FileDialog />
        </div>
        <div class="mt-4">
            <div class="text-cyan-700 text-lg">                
                <div v-for="file in uploadedFiles" :key="file.path">
                    <PreviewFiles
                        :file-name="file.fileName"
                        :url="file.path"
                        :file-type="file.fileType"
                        @delete="handleDelete(file._id, file.fileName)"
                    />
                </div>                
            </div>
        </div>
    </div>
</template>
