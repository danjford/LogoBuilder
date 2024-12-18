<script lang="ts">
    import iconNodes from "lucide-static/icon-nodes.json";
    import { Button } from "$lib/components/ui/button";
    import { Label } from "$lib/components/ui/label";
    import { Slider } from "$lib/components/ui/slider";
    import ColorPicker, { ChromeVariant } from "svelte-awesome-color-picker";
    import { browser } from "$app/environment";
    import BackgroundOptions from "$lib/BackgroundOptions.svelte";
    import IconOptions from "$lib/IconOptions.svelte";
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import { renderIcon } from "$lib/icons";

    let activeType = $state("icon");

    let rounded = $state(86);
    let padding = $state(16);
    let shadow = $state(0);
    let shadowOptions = ["none", "sm", "md", "lg", "xl", "2xl"];
    let hex = $state("#f6f0dc");
    let rgb = $state({
        r: 137,
        g: 73,
        b: 255,
        a: 1,
    });
    let hsv = $state({
        h: 46,
        s: 11,
        v: 96,
        a: 1,
    });

    let iconSize = $state(250);
    let icon = $state("flame");
    let rotate = $state(0);
    let borderWidth = $state(1);
    let borderColour = $state({
        r: 255,
        g: 255,
        b: 255,
        a: 1,
    });
    let fillOpacity = $state(0);
    let fillColour = $state({
        r: 255,
        g: 255,
        b: 255,
        a: 1,
    });

    let svg = $state();

    let svgElements = $derived.by(() => {
        const foundIcon = iconNodes[icon];

        if (!foundIcon) return;

        return renderIcon(foundIcon);
    });

</script>

<header class="h-[50px]">
    <div class="flex flex-row justify-between items-center h-full">
        <div class="flex flex-row items-center gap-2 font-bold text-lg pl-4">Logo Builder</div>
    </div>
</header>

<div class="flex flex-col md:flex-row h-[calc(100vh-50px)]">
    <aside class="md:h-full">
        <div class="flex flex-col md:flex-row h-full">
            <div class="p-2 border border-l-0 md:h-full">
                <ul class="flex flex-row md:flex-col">
                    <li>
                        <Button
                            variant="ghost"
                            class="w-full justify-start {activeType === 'icon' ? 'bg-primary/10' : ''}"
                            onclick={() => (activeType = "icon")}>Icon</Button
                        >
                    </li>
                    <li>
                        <Button
                            variant="ghost"
                            class="w-full justify-start {activeType === 'background' ? 'bg-primary/10' : ''}"
                            onclick={() => (activeType = "background")}>Background</Button
                        >
                    </li>
                </ul>
            </div>

            <ScrollArea class="h-[40svh] md:h-full">
                <div class="md:w-64 flex flex-col gap-4 flex-grow p-4 border border-l-0 h-full">
                        {#if activeType === "icon"}
                            <IconOptions
                                bind:iconSize
                                bind:icon
                                bind:rotate
                                bind:borderWidth
                                bind:borderColour
                                bind:fillOpacity
                                bind:fillColour
                                {svgElements}
                            />
                        {:else}
                            <BackgroundOptions bind:rounded bind:padding bind:shadow bind:shadowOptions bind:iconSize bind:hex bind:rgb bind:hsv />
                        {/if}
                </div>
            </ScrollArea>
        </div>
    </aside>

    <main class="flex-grow border border-l-0 relative">
        <div class="blueprint"></div>

        <div class="flex flex-row justify-center items-center h-full">
            <div class="w-screen max-w-full aspect-square md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[600px] xl:h-[600px] bg-muted-foreground/10 border border-dashed border-foreground/10 border-2" style="padding: {padding}px;">
                <div
                    class="w-full aspect-square overflow-hidden flex justify-center items-center shadow-{shadowOptions[shadow]}"
                    style="background: rgba({rgb.r}, {rgb.g}, {rgb.b}, {rgb.a}); border-radius: {rounded}px;"
                >
                    <span style="transform: rotate({rotate}deg);">
                        <svg
                            bind:this={svg}
                            viewBox="0 0 24 24"
                            fill={`rgba(${fillColour.r}, ${fillColour.g}, ${fillColour.b}, ${fillColour.a})`}
                            stroke={`rgba(${borderColour.r}, ${borderColour.g}, ${borderColour.b}, ${borderColour.a})`}
                            width={iconSize}
                            height={iconSize}
                            stroke-width={borderWidth}
                            fill-opacity="{fillOpacity}%"
                        >
                            {#if browser}
                                {@html svgElements}
                            {/if}
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    </main>
</div>
