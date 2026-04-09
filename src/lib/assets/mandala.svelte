<script lang="ts">

    let sY:number
    export let color = 'var(--col-green)'
    
    </script>

<svelte:window bind:scrollY={sY}/>
    
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate({sY/4}deg)">
      <g id="mandala">
      <circle class="gol" id="one" cx="40" cy="10.8438" r="9.84375" fill={color}/>
      <circle class="gol" id="two" cx="65.1562" cy="26.1562" r="9.84375" fill={color}/>
      <circle class="gol" id="three" cx="65.1562" cy="54.5938" r="9.84375" fill={color}/>
      <circle class="gol" id="four" cx="40" cy="68.8125" r="9.84375" fill={color}/>
      <circle class="gol" id="five" cx="14.8438" cy="54.5938" r="9.84375" fill={color}/>
      <circle class="gol" id="six" cx="14.8438" cy="26.1562" r="9.84375" fill={color}/>
      <circle class="gol" id="seven" cx="40" cy="40.375" r="9.84375" fill={color}/>
      </g>
    </svg>
    
    <style lang="sass">
    
    svg
      height: 100%
      width: 100%
      object-fit: contain
      cursor: pointer
      transform-origin: center center
    
    #one
      transition-delay: 0s
    
    #two
      transition-delay: 0.05s
    
    #three
      transition-delay: 0.1s
    
    #four
      transition-delay: 0.15s
    
    #five
      transition-delay: 0.2s
    
    #six
      transition-delay: 0.25s
    
    #seven
      transition-delay: 0.3s
      
    </style>
      