<script>
    import {alert} from '../../store/stores';
    // import {onDestroy} from "svelte";

    // let alertContent = ''
    // we call the method alert.subscribe(), passing it a callback function as a parameter.
    // Whenever the value of the store changes, the callback function will be called with the new value as its parameter.
    // In the callback function we just assign the value we receive to the local variable, which will trigger the update of the component's DOM.
    // const unsubscribe = alert.subscribe((value) => alertContent = value);

    // onDestroy() lifecycle function, which lets us execute a callback after the component has been unmounted.
    // onDestroy(unsubscribe)
</script>

<!--{#if alertContent}-->
<!--    <div on:click={()=>alertContent=''}>-->
<!--        <p>{alertContent}</p>-->
<!--    </div>-->
<!--{/if}-->

<!--Svelte provides the reactive $store syntax, also known as auto-subscription.
You just prefix the store with the $ sign and Svelte will generate the code
to make it reactive automatically.
Our previous code block can be replaced with this:-->
{#if $alert}
    <div on:click={() => $alert = ''}>
        <p>{ $alert }</p>
    </div>
{/if}

<style>
    div {
        position: fixed;
        cursor: pointer;
        margin-right: 1.5rem;
        margin-left: 1.5rem;
        margin-top: 1rem;
        right: 0;
        display: flex;
        align-items: center;
        border-radius: 0.2rem;
        background-color: #565656;
        color: #fff;
        font-weight: 700;
        padding: 0.5rem 1.4rem;
        font-size: 1.5rem;
        z-index: 100;
        opacity: 95%;
    }

    div p {
        color: #fff;
    }

    div svg {
        height: 1.6rem;
        fill: currentcolor;
        width: 1.4rem;
        margin-right: 0.5rem;
    }
</style>