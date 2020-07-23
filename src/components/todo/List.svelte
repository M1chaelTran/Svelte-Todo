<script>
  import List from '@smui/list'
  import isEmpty from 'lodash/isEmpty'

  export let items
  let classes
  export { classes as class }
</script>

{#if !isEmpty(items)}
  <List class={classes}>
    {#each items as item}
      <slot {item} />
    {/each}
  </List>
{/if}
