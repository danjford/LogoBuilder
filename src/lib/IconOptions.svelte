<script lang="ts">
    import ColorPicker from 'react-best-gradient-color-picker'
    import { ReactAdapter } from "svelte-react-kit";
    import { Button } from "./components/ui/button";
    import { Label } from "./components/ui/label";
    import { Slider } from "./components/ui/slider";
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
    import { Input } from "./components/ui/input";
    import { ScrollArea } from "./components/ui/scroll-area";
    import iconNodes from "lucide-static/icon-nodes.json";
    import { renderIcon } from "./icons";
    import VirtualList from '@sveltejs/svelte-virtual-list';
    import ReactColorPicker from './ReactColorPicker.svelte';

    let {
        iconSize = $bindable(250),
        icon = $bindable("fire-extinguisher"),
        rotate = $bindable(0),
        borderWidth = $bindable(1),
        borderColour = $bindable('rgb(255, 255, 255, 1)'),
        fillOpacity = $bindable(0),
        fillColour = $bindable('rgb(255, 255, 255, 1)'),
        svgElements = $bindable(""),
    } = $props();


    let search = $state("");

    let filteredIcons = $derived.by(() => {
        return Object.entries(iconNodes).filter(([key, node]) => {
            return key.toLowerCase().includes(search.toLowerCase());
        });
    });

    let open = $state(false);

    let start = $state();
	let end = $state();

    const ICONS_PER_ROW = 12;

    // Group icons into rows
    let groupedIcons = $derived.by(() => {
        const rows = [];
        for (let i = 0; i < filteredIcons.length; i += ICONS_PER_ROW) {
            rows.push(filteredIcons.slice(i, i + ICONS_PER_ROW));
        }
        return rows;
    });

</script>

<div class="flex flex-row justify-between">
    <Label class="text-md font-bold">Icon</Label>
    <small class="text-sm text-muted-foreground">
        {icon
            ?.split("-")
            ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            ?.join(" ") ?? ""}
    </small>
</div>

<Dialog bind:open={open}>
    <DialogTrigger asChild let:builder>
        <Button builders={[builder]} variant="ghost" class="w-12 h-12 justify-center items-center bg-primary/10">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                {@html svgElements}
            </svg>
        </Button>
    </DialogTrigger>
    <DialogContent class="w-full max-w-screen-md">
        <DialogHeader>
            <DialogTitle>Pick an Icon</DialogTitle>
        </DialogHeader>

        <Input type="text" placeholder="Search icons" bind:value={search} />

        <!-- <ScrollArea class="h-full sm:h-[80vh]"> -->

        <div class="h-[60vh]">
            <VirtualList items={groupedIcons} itemHeight={48} class="h-full" bind:start bind:end>
                {#snippet children({ item })}
                    <div class="flex flex-row gap-2 justify-center mb-2">
                        {#each item as [key, node]}
                            <Button 
                                variant="ghost" 
                                class="w-12 h-12 justify-center items-center bg-primary/10" 
                                on:click={() => {
                                    icon = key;
                                    open = false;
                                }}
                            >
                                <svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="pointer-events-none"
                                >
                                    {@html renderIcon(node)}
                                </svg>
                            </Button>
                        {/each}
                    </div>
                {/snippet}
            </VirtualList>
        </div>
        
        <!-- {start} -->
        <!-- {end} -->

            <!-- <div class="flex flex-wrap gap-2 justify-center">
                {#each filteredIcons as [key, node]}
                    <div class="flex flex-row justify-between">
                        <Button variant="ghost" class="w-12 h-12 justify-center items-center bg-primary/10" onclick={() => {
                            icon = key;
                            open = false;
                        }}>
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="pointer-events-none"
                            >
                                {@html renderIcon(node)}
                            </svg>
                        </Button>
                    </div>
                {/each}
            </div> -->
        <!-- </ScrollArea> -->
    </DialogContent>
</Dialog>

<div class="flex flex-row justify-between">
    <Label class="text-md font-bold">Size</Label>
    <small class="text-sm text-muted-foreground">{iconSize}px</small>
</div>

<Slider
    value={[iconSize]}
    min={100}
    max={600}
    step={1}
    onValueChange={(e) => {
        iconSize = e[0];
    }}
/>

<div class="flex flex-row justify-between">
    <Label class="text-md font-bold">Rotate</Label>
    <small class="text-sm text-muted-foreground">{rotate}deg</small>
</div>

<Slider
    value={[rotate]}
    min={-180}
    max={180}
    step={1}
    onValueChange={(e) => {
        rotate = e[0];
    }}
/>

<div class="flex flex-row justify-between">
    <Label class="text-md font-bold">Border Width</Label>
    <small class="text-sm text-muted-foreground">{borderWidth}px</small>
</div>

<Slider
    value={[borderWidth]}
    min={1}
    max={4}
    step={1}
    onValueChange={(e) => {
        borderWidth = e[0];
    }}
/>

<div class="flex flex-row justify-between">
    <Label class="text-md font-bold">Border Colour</Label>
</div>




<!-- <ColorPicker --cp-text-color="black" bind:rgb={borderColour} position="responsive" components={ChromeVariant} sliderDirection="horizontal" isDialog={false} /> -->


<ReactColorPicker
    bind:color={borderColour}
    disableDarkMode={true}
    hideControls={true}
    hidePresets={true}
    hideOpacity={true}
/>

<div class="flex flex-row justify-between">
    <Label class="text-md font-bold">Fill Opacity</Label>
    <small class="text-sm text-muted-foreground">{fillOpacity}%</small>
</div>

<Slider
    value={[fillOpacity]}
    min={0}
    max={100}
    step={1}
    onValueChange={(e) => {
        fillOpacity = e[0];
    }}
/>

<div class="flex flex-row justify-between">
    <Label class="text-md font-bold">Fill Colour</Label>
</div>



<ReactColorPicker
    bind:color={fillColour}
    disableDarkMode={true}
    hideControls={true}
    hidePresets={true}
    hideOpacity={true}
/>
