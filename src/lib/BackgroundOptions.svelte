<script lang="ts">
    import iconNodes from "lucide-static/icon-nodes.json";
    import { Button } from "$lib/components/ui/button";
    import { Label } from "$lib/components/ui/label";
    import { Slider } from "$lib/components/ui/slider";
    import ColorPicker, { ChromeVariant } from "svelte-awesome-color-picker";
    import { browser } from "$app/environment";

    let {
        rounded = $bindable(),
        padding = $bindable(),
        shadow = $bindable(),
        shadowOptions = $bindable(),
        iconSize = $bindable(),
        hex = $bindable(),
        rgb = $bindable(),
        hsv = $bindable(),
        color = $bindable(),
    } = $props();


</script>

<div class="flex flex-row justify-between">
    <Label class="text-md font-bold">Rounded</Label>
    <small class="text-sm text-muted-foreground">{rounded}px</small>
</div>

<Slider
    value={[rounded]}
    max={300}
    step={1}
    onValueChange={(e) => {
        rounded = e[0];
    }}
/>

<div class="flex flex-row justify-between">
    <Label class="text-md font-bold">Padding</Label>
    <small class="text-sm text-muted-foreground">{padding}px</small>
</div>
<Slider
    value={[padding]}
    max={100}
    step={1}
    onValueChange={(e) => {
        padding = e[0];
    }}
/>

<div class="flex flex-row justify-between">
    <Label class="text-md font-bold">Shadow</Label>
    <small class="text-sm text-muted-foreground">{shadowOptions[shadow]}</small>
</div>

<div class="flex flex-col gap-2">
    <Slider
        value={[shadow]}
        max={5}
        step={1}
        onValueChange={(e) => {
            shadow = e[0];
        }}
    />

    <div class="flex flex-row justify-between">
        <small class="w-1/12 text-xs text-muted-foreground">NA</small>
        <small class="w-1/12 text-xs text-muted-foreground">SM</small>
        <small class="w-1/12 text-xs text-muted-foreground">MD</small>
        <small class="w-1/12 text-xs text-muted-foreground">LG</small>
        <small class="w-1/12 text-xs text-muted-foreground">XL</small>
        <small class="w-1/12 text-xs text-muted-foreground">2XL</small>
    </div>
</div>

<div class="flex flex-row justify-between">
    <Label class="text-md font-bold">Background</Label>
</div>

<ColorPicker
    --cp-text-color="black"
    bind:hex
    bind:rgb
    bind:color
    position="responsive"
    components={ChromeVariant}
    sliderDirection="horizontal"
    isDialog={false}
/>