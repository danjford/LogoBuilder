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
    import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
    import { AlarmClockOff, Github } from "lucide-svelte";

    let activeType = $state("icon");

    let rounded = $state(86);
    let padding = $state(16);
    let shadow = $state(0);
    let shadowOptions = ["none", "sm", "md", "lg", "xl", "2xl"];
    let hex = $state("#f6f0dc");
    let bgRgb = $state({
        r: 137,
        g: 73,
        b: 255,
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

<header class="h-[50px] overflow-hidden">
    <div class="flex flex-row justify-between items-center h-full">
        <div class="flex flex-row items-center gap-2 font-bold text-lg pl-4">Logo Builder</div>

        <div class="flex items-center">
            <h2 class="text-muted-foreground text-sm">
                Presets
            </h2>
            <div class="flex flex-row gap-4 px-2">
                <Tooltip closeDelay={0}>
                    <TooltipTrigger>
                        <button class="bg-black p-2 group" onclick={() => {
                            bgRgb = {
                                r: 0,
                                g: 0,
                                b: 0,
                                a: 1,
                            };

                            borderColour = {
                                r: 255,
                                g: 255,
                                b: 255,
                                a: 1,
                            };
                        }}>
                            <AlarmClockOff class="text-white group-hover:scale-110" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent class="bg-black text-white max-w-[400px] p-4">
                        <p class="font-bold">Black & White</p>
                        <p>Great for startups that want to look professional, serious, and modern. For example, Apple and Nike.</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip closeDelay={0}>
                    <TooltipTrigger>
                        <button class="bg-[#ffeda0] p-2 group" onclick={() => {
                            bgRgb = {
                                r: 255,
                                g: 237,
                                b: 160,
                                a: 1,
                            };

                            borderColour = {
                                r: 0,
                                g: 0,
                                b: 0,
                                a: 1,
                            };

                            rounded = 0;
                        }}>
                            <AlarmClockOff class="text-black group-hover:scale-110" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent class="bg-black text-white max-w-[400px] p-4">
                        <p class="font-bold">Plain & Square</p>
                        <p>Tech startups that look for versatility (easy to reuse across platforms) and simplicity. For example, Stripe amd Slack.</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>

        <div class="group">
            <a href="https://github.com/danjford/LogoBuilder" target="_blank" class="p-4 block hover:bg-muted-foreground/10 ">
                <Github class="transition-all duration-300 group-hover:scale-110"/>
            </a>
        </div>
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
                            <BackgroundOptions bind:rounded bind:padding bind:shadow bind:shadowOptions bind:iconSize bind:hex bind:rgb={bgRgb}/>
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
                    style="background: rgba({bgRgb.r}, {bgRgb.g}, {bgRgb.b}, {bgRgb.a}); border-radius: {rounded}px;"
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
