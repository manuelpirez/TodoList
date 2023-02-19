<style>
    .container {
        padding: 10px 10px 20px 10px;
    }
</style>
<script>
    import {selectOnFocus} from '../../util/actions';
    import {alert} from "../../store/stores.js";
    import Spinner from "./Spinner.svelte";

    let hobbies = []
    let hobbyInput, hobbyVal
    let isLoading = false

    const getHobbies = () => {
        isLoading = true
        return fetch('https://sivaone-170419-default-rtdb.firebaseio.com/hobbies.json').then(res => {
            if (!res.ok) {
                throw new Error("Failed")
            }
            return res.json()
        }).then(data => {
            isLoading = false
            hobbies = Object.values(data)
            // let keys = Object.keys(data)
            // for (const dataKey in data) {
            //     console.log(dataKey, data[dataKey])
            // }
            return hobbies
        }).catch(err => {
            isLoading = false
            console.log(err)
            return hobbies
        })
    }
    let promise = getHobbies()
    const addHobby = () => {
        isLoading = true
        hobbies = [...hobbies, hobbyInput.value]
        fetch('https://sivaone-170419-default-rtdb.firebaseio.com/hobbies.json', {
            method: 'POST',
            body: JSON.stringify(hobbyInput.value),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (!res.ok) {
                throw new Error("Failed")
            }
            promise = getHobbies()
            $alert = `${hobbyInput.value} Added to Hobby List`
        }).catch(err => {
            console.log(err)
            $alert = `${hobbyInput.value} Error Adding a Hobby :(`
        }).finally(() => {
            isLoading = false
            hobbyVal = ''
        })
    }
    const onCancel = () => {
        hobbyVal = ''
        hobbyInput = ''
    }
</script>

<div class="container">
    <form on:keydown={(e) => e.key === 'Escape' && onCancel()} on:submit|preventDefault={addHobby}>
        <label for="hobby">Hobby</label>
        <input autoComplete="off" bind:this={hobbyInput} bind:value={hobbyVal} disabled={isLoading} id="hobby"
               type="text"
               use:selectOnFocus>
        <button type="submit">Add Hobby</button>

        <div>
            {#await promise}
                <Spinner/>
            {:then hobbyData}
                <ul>
                    {#each hobbyData as hobby}
                        <li>{hobby}</li>
                    {/each}
                </ul>
            {:catch error}
                <p> error: {error.message}</p>
            {/await}
        </div>
    </form>
</div>