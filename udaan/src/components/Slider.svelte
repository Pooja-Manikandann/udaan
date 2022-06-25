<script>
	import Slider from '@bulatdashiev/svelte-slider';	
	export let value = [1000, 6000];
</script>


<Slider max="7000" step="1" bind:value={value} range order />