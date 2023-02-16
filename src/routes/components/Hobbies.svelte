<style>
    .container{
        padding: 10px 10px 20px 10px;
    }
</style>
<script>
    import {selectOnFocus} from '../../util/actions';
    import {alert} from "../../store/stores.js";
    import Spinner from "./Spinner.svelte";
    import {onMount} from "svelte";

    let hobbies = []
    let hobbyInput, hobbyVal
    let isLoading = false

    // Fetch from FB and load initial state
    onMount(() => {
        isLoading = true
        return fetch('https://sivaone-170419-default-rtdb.firebaseio.com/hobbies.json').then(res => {
            isLoading = false
            if (!res.ok) {
                throw new Error("Failed")
            }
            return res.json()
        }).then(data => {
            hobbies = Object.values(data)
            // console.log(hobbies)
            // let keys = Object.keys(data)
            // for (const dataKey in data) {
            //     console.log(dataKey, data[dataKey])
            // }
        }).catch(err => {
            isLoading = false
            console.log(err)
        })
    })
    const addHobby = () => {
        hobbies = [...hobbies, hobbyInput.value]
        isLoading = true
        fetch('https://sivaone-170419-default-rtdb.firebaseio.com/hobbies.json', {
            method: 'POST',
            body: JSON.stringify(hobbyInput.value),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            isLoading = false
            if (!res.ok) {
                throw new Error("Failed")
            }
            $alert = `${hobbyInput.value} Added to Hobby List`
            hobbyVal = ''
        }).catch(err => {
            isLoading = false
            console.log(err)
            $alert = `${hobbyInput.value} Error Adding a Hobby :(`
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
    </form>

    <div>
        {#if isLoading}
            <Spinner/>
        {:else}
            <ul>
                {#each hobbies as hobby}
                    <li>{hobby}</li>
                {/each}
            </ul>
        {/if}
    </div>
</div>