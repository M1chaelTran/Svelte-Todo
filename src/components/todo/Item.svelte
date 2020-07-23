<script>
  import { Item, Graphic, Label, Meta } from '@smui/list'
  import Checkbox from '@smui/checkbox'
  import IconButton from '@smui/icon-button'

  export let item
  export let onCompleteTodo
  export let onDeleteTodo

  function handleCheckTodo() {
    onCompleteTodo({ ...item, complete: !item.complete })
  }

  function handleDeleteTodo(e) {
    e.stopPropagation()
    onDeleteTodo(item)
  }
</script>

<style lang="scss">
  :global(.mdc-list-item:hover) {
    :global(.delete-button) {
      visibility: visible;
    }
  }
  :global(.delete-button) {
    visibility: hidden;
  }
</style>

<Item on:click={handleCheckTodo}>
  <Graphic>
    <Checkbox bind:checked={item.complete} />
  </Graphic>
  <Label>{item.name}</Label>
  <Meta>
    <IconButton
      class="material-icons-outlined ml-1 delete-button"
      on:click={handleDeleteTodo}>
      delete
    </IconButton>
  </Meta>
</Item>
