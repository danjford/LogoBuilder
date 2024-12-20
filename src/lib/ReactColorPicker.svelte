<script lang="ts">
    import ColorPicker from "react-best-gradient-color-picker";
    import { onDestroy, onMount } from "svelte";
    import React from "react";
    import ReactDOM from "react-dom/client";

    const e = React.createElement;
    let container: HTMLElement;

    let root: any;

    let { color = $bindable("rgba(255, 255, 255, 1)"), ...props } = $props();

    const render = () => {
        try {
            if (!root) {
                root = ReactDOM.createRoot(container);
            }

            root.render(
                e(
                    ColorPicker,
                    {
                        width: 220,
                        height: 200,
                        disableDarkMode: true,
                        hideColorGuide: true,
                        hideInputType: true,
                        hidePresets: true,
                        value: color,
                        onChange: (e) => {
                            color = e;
                            render();
                        },
                        ...props
                    },
                    null
                )
            );
        } catch (err) {
            console.warn(`react-adapter failed to mount.`, { err });
        }
    };

    onMount(() => {
        render();
    });

    onDestroy(() => {
        root?.unmount();
    });
</script>

<div bind:this={container} />