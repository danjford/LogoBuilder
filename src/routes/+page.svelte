<script lang="ts">
    import iconNodes from "lucide-static/icon-nodes.json";
    import { Button } from "$lib/components/ui/button";
    import { browser } from "$app/environment";
    import BackgroundOptions from "$lib/BackgroundOptions.svelte";
    import IconOptions from "$lib/IconOptions.svelte";
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import { renderIcon } from "$lib/icons";
    import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
    import { AlarmClockOff, Github } from "lucide-svelte";
    import ThemeTooltip from "$lib/ThemeTooltip.svelte";

    let activeType = $state("icon");

    let rounded = $state(86);
    let padding = $state(16);
    let shadow = $state(0);
    let shadowOptions = ["none", "sm", "md", "lg", "xl", "2xl"];
    let hex = $state("#f6f0dc");
    let bgRgb = $state("rgba(137, 73, 255, 1)");

    let iconSize = $state(250);
    let icon = $state("flame");
    let rotate = $state(0);
    let borderWidth = $state(1);
    let borderColour = $state("rgb(255, 255, 255)");
    let fillOpacity = $state(0);
    let fillColour = $state("rgb(255, 255, 255, 1)");

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
            <h2 class="text-muted-foreground text-sm">Presets</h2>
            <div class="flex flex-row gap-4 px-2">
                <ThemeTooltip
                    class="bg-black"
                    iconClass="text-white"
                    title="Black & White"
                    description="Great for startups that want to look professional, serious, and modern. For example, Apple and Nike."
                    onclick={() => {
                        bgRgb = "rgba(0, 0, 0, 1)";

                        borderColour = "rgb(255, 255, 255)";

                        fillOpacity = 0;
                    }}
                />

                <ThemeTooltip
                    class="bg-[#ffeda0]"
                    iconClass="text-black"
                    title="Plain & Square"
                    description="Tech startups that look for versatility (easy to reuse across platforms) and simplicity. For example, Stripe amd Slack."
                    iconFill="rgb(255, 255, 255)"
                    onclick={() => {
                        bgRgb = "rgba(255, 237, 160, 1)";

                        borderColour = "rgb(0, 0, 0)";

                        rounded = 0;

                        fillOpacity = 100;
                        fillColour = "rgb(255, 255, 255)";
                    }}
                />

                <ThemeTooltip
                    class="rounded-md bg-gradient-to-tr from-[rgb(239,112,155)] to-[rgb(236,160,255)]"
                    iconClass="text-black"
                    title="Rounded & Gradient"
                    description="Great for startups that want to look friendly and trendy. For example, Instagram."
                    iconFill="rgb(255, 255, 255)"
                    onclick={() => {
                        bgRgb = "linear-gradient(45deg, rgb(239, 112, 155) 0%, rgb(236, 160, 255) 100%)";

                        borderColour = "rgb(0, 0, 0)";

                        fillOpacity = 100;

                        fillColour = "rgb(255, 255, 255)";

                        rounded = 100;
                    }}
                />

                <ThemeTooltip
                    class="rounded-full bg-[radial-gradient(circle,_rgb(198,248,255)_0%,_rgb(169,255,104)_100%)]"
                    iconClass="text-black"
                    iconFill="rgb(255, 255, 255)"
                    title="Circle & Gradient"
                    description="Great for startups that want to look friendly and trendy. For example, Instagram."
                    onclick={() => {
                        bgRgb = "radial-gradient(circle, rgb(198, 248, 255) 0%, rgb(169, 255, 104) 100%)";

                        borderColour = "rgb(0, 0, 0)";

                        fillOpacity = 100;

                        fillColour = "rgb(255, 255, 255)";

                        rounded = 300;
                    }}
                />
            </div>
        </div>

        <div class="group">
            <a href="https://github.com/danjford/LogoBuilder" target="_blank" class="p-4 block hover:bg-muted-foreground/10">
                <Github class="transition-all duration-300 group-hover:scale-110" />
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
                        <IconOptions bind:iconSize bind:icon bind:rotate bind:borderWidth bind:borderColour bind:fillOpacity bind:fillColour {svgElements} />
                    {:else}
                        <BackgroundOptions bind:rounded bind:padding bind:shadow bind:shadowOptions bind:color={bgRgb} />
                    {/if}
                </div>
            </ScrollArea>
        </div>
    </aside>

    <main class="flex-grow border border-l-0 relative">
        <div class="blueprint"></div>

        <div class="flex flex-row justify-center items-center h-full">
            <div
                class="w-screen max-w-full aspect-square md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[600px] xl:h-[600px] bg-muted-foreground/10 border border-dashed border-foreground/10 border-2"
                style="padding: {padding}px;"
            >
                <div
                    class="w-full aspect-square overflow-hidden flex justify-center items-center shadow-{shadowOptions[shadow]}"
                    style="background: {bgRgb}; border-radius: {rounded}px;"
                >
                    <span style="transform: rotate({rotate}deg);">
                        <svg
                            bind:this={svg}
                            viewBox="0 0 24 24"
                            fill={fillColour}
                            stroke={borderColour}
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
