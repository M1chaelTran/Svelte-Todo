<script>
  import { onMount } from 'svelte'
  import Textfield from '@smui/textfield'

  let name = ''
  let ref
  export let onAddTodo

  onMount(() => {
    ref.focus()
  })

  async function handleAddTodo(e) {
    const keyCode = e.keyCode || e.which
    if (keyCode == '13') {
      await onAddTodo(name)
      name = ''
    }
  }
</script>

<Textfield
  placeholder="Type in what do you want to do..."
  bind:this={ref}
  variant="filled"
  bind:value={name}
  label="Add todo"
  on:keyup={handleAddTodo} />
