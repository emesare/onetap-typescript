/**
 * @file Declaration file for interacting with the onetap scripting engine.
 * @author April <april#0001>
 * @author Dank <git@dank.anonaddy.com>
 */


/**
 * An array of strings that references a path to a menu element.
 */
export declare type Path = Array<string>;

/**
 * The index of an entity in the game world.
 */
export declare type EntityID = number;

/**
 * The index of a user in an event.
 */
export declare type UserID = number;

/**
 * An array containing three number corresponding to the X, Y and Z positions of a 3D point.
 * Or, alternatively, an array containing the pitch, yaw and roll of an Euler angle.
 */
export declare type Vector = Array<number>;

/**
 * An enum listing each stage in a game "frame".
 * @readonly
 * @enum {number}
 */
export enum FrameStage {
    /** Identifies that frame has started. */
    FRAME_START = 0,
    /** Identifies that network packet has been received. */
    FRAME_NET_UPDATE_START,
    /** Identifies that packet's processing has started. */
    FRAME_NET_UPDATE_POSTDATAUPDATE_START,
    /** Identifies that packet's processing has ended. */
    FRAME_NET_UPDATE_POSTDATAUPDATE_END,
    /** Identifies that network packet has been processed. */
    FRAME_NET_UPDATE_END,
    /** Identifies that frame's rendering has started. */
    FRAME_RENDER_START,
    /** Identifies that frame's rendering has ended. */
    FRAME_RENDER_END
}

/**
 * An enum listing each hitbox index.
 * @readonly
 * @enum {number}
 */
export enum HitboxIndex {
    HEAD = 0,
    NECK,
    PELVIS,
    BODY,
    THORAX,
    CHEST,
    UPPER_CHEST,
    RIGHT_THIGH,
    LEFT_CALF,
    RIGHT_CALF,
    LEFT_FOOT,
    RIGHT_FOOT,
    LEFT_HAND,
    RIGHT_HAND,
    LEFT_UPPER_ARM,
    LEFT_FOREARM,
    RIGHT_UPPER_ARM,
    RIGHT_FOREARM,
}

/**
 * An enum listing each animation layer index.
 * @readonly
 * @enum {number}
 * @todo Comment enum items.
 */
export enum AnimationLayerIndex {
    AIMMATRIX = 0,
    WEAPON_ACTION,
    WEAPON_ACTION_RECROUCH,
    ADJUST,
    MOVEMENT_JUMP_OR_FALL,
    MOVEMENT_LAND_OR_CLIMB,
    MOVEMENT_MOVE,
    MOVEMENT_STRAFECHANGE,
    WHOLE_BODY,
    FLASHED,
    FLINCH,
    ALIVELOOP,
    LEAN
}

export interface AnimationLayer {
    Sequence: number;
    Activity: number;
    Weight: number;
    WeightDeltaRange: number;
    Cycle: number;
    PlaybackRate: number;
}

export interface PredictedGrenadeHit {
    /** Entity index that is predicted to be hit. */
    EntityIndex: EntityID;
    /** Predicted damage the grenade will inflict on the entity. */
    Damage: number;
}

export interface PredictedGrenade {
    /** Indicates if the grenade is live. */
    IsLive: boolean;
    /** Entity index of the grenade's owner. */
    Owner: EntityID;
    /** Indicates the type of grenade (i.e. Molotov). */
    Type: string;
    /** Entity index of the grenade. */
    EntityIndex: EntityID;
    /** Predicted end point of the grenade. */
    Position: Vector;
    /** List of entities predicted to be hit by the grenade. */
    Hits: Array<PredictedGrenadeHit>;
}

/**
 * @see {@link https://www.onetap.com/scripting/categories/2/| Official Onetap Documentation}
 */
declare namespace Globals {
    /**
     * @returns The amount of choked ticks.
     * @see {@link https://www.onetap.com/resources/180/| Official Onetap Documentation}
     */
    function ChokedCommands(): number;

    /**
     * @returns The time, in seconds, since the game started.
     * @see {@link https://www.onetap.com/resources/64/| Official Onetap Documentation}
     */
    function Realtime(): number;

    /**
     * @returns The time, in seconds, between the last and current frame.
     * @see {@link https://www.onetap.com/resources/63/| Official Onetap Documentation}
     */
    function Frametime(): number;

    /**
     * @returns The time, in seconds, since the server started.
     * @see {@link https://www.onetap.com/resources/12/| Official Onetap Documentation}
     */
    function Curtime(): number;

    /**
     * @returns The interval, in seconds, between each tick.
     * @see {@link https://www.onetap.com/resources/11/| Official Onetap Documentation}
     */
    function TickInterval(): number;

    /**
     * @returns The server's amount of ticks/second.
     * @see {@link https://www.onetap.com/resources/10/| Official Onetap Documentation}
     */
    function Tickrate(): number;

    /**
     * @returns The time, in ticks, since the server started.
     * @see {@link https://www.onetap.com/resources/9/| Official Onetap Documentation}
     */
    function Tickcount(): number;

    /**
     * @returns The current FrameStageNotify stage.
     * @see {@link https://www.onetap.com/resources/8/| Official Onetap Documentation}
     */
    function FrameStage(): FrameStage;
}

/**
 * @see {@link https://www.onetap.com/scripting/categories/5/| Official Onetap Documentation}
 */
declare namespace UI {
    /**
     * Register a new callback to a certain menu element.
     * @param path The element's path.
     * @see {@link https://www.onetap.com/resources/230/| Official Onetap Documentation}
     */
    function RegisterCallback(path: Path): void;

    /**
     * @returns The cheat's menu position.
     * @see {@link https://www.onetap.com/resources/214/| Official Onetap Documentation}
     */
    function GetMenuPosition(): Array<number>;

    /**
     * Updates the list of a Dropdown or Multi-dropdown.
     * @param path The element's path.
     * @param list The new list of values.
     * @see {@link https://www.onetap.com/resources/211/| Official Onetap Documentation}
     */
    function UpdateList(path: Path, list: Array<string>): void;

    /**
     * Removes a menu element created by a script.
     * @param path The element's path.
     * @see {@link https://www.onetap.com/resources/210/| Official Onetap Documentation}
     */
    function RemoveItem(path: Path): void;

    /**
     * @returns The virtual-key code for a hotkey.
     * @param path The element's path.
     * @see {@link https://www.onetap.com/resources/209/| Official Onetap Documentation}
     */
    function GetHotkey(path: Path): number;

    /**
     * Overrides a hotkey's state/mode.
     * @param path The element's path.
     * @param state The new state in string form. This can either be 'Always', 'Toggle' or 'Hold'.
     * @see {@link https://www.onetap.com/resources/207/| Official Onetap Documentation}
     */
    function SetHotkeyState(path: Path, state: string): void;

    /**
     * @returns The state/mode of a hotkey.
     * @param path The element's path.
     * @see {@link https://www.onetap.com/resources/206/| Official Onetap Documentation}
     */
    function GetHotkeyState(path: Path): string;

    /**
     * Toggles a hotkey on/off. Only works on hotkeys set to 'Toggle'.
     * @param path The element's path.
     * @see {@link https://www.onetap.com/resources/203/| Official Onetap Documentation}
     */
    function ToggleHotkey(path: Path): void;

    /**
     * Overrides a color-picker's color.
     * @param path The element's path.
     * @param color The new color.
     * @see {@link https://www.onetap.com/resources/202/| Official Onetap Documentation}
     */
    function SetColor(path: Path, color: Array<number>): void;

    /**
     * Creates a new sub-tab at the designated path and then returns the registered path.
     * @param path The path to the tab.
     * @param name The sub-tab's name.
     * @see {@link https://www.onetap.com/resources/201/| Official Onetap Documentation}
     */
    function AddSubTab(path: Path, name: string): Path;

    /**
     * Creates a new textbox at the designated path and then returns the registered path.
     * @param path The path to the textbox.
     * @param name The textbox's name.
     * @see {@link https://www.onetap.com/resources/200/| Official Onetap Documentation}
     */
    function AddTextbox(path: Path, name: string): Path;

    /**
     * Creates a new color picker at the designated path and then returns the registered path.
     * @param path The path to the color picker.
     * @param name The color picker's name.
     * @see {@link https://www.onetap.com/resources/199/| Official Onetap Documentation}
     */
    function AddColorPicker(path: Path, name: string): Path;

    /**
     * Creates a new multi-dropdown at the designated path and then returns the registered path.
     * @param path The path to the multi-dropdown.
     * @param name The multi-dropdown's name.
     * @param values The multi-dropdown's values.
     * @param search_bar Whether or not the multi-dropdown should contain a search bar.
     * @see {@link https://www.onetap.com/resources/198/| Official Onetap Documentation}
     */
    function AddMultiDropdown(path: Path, name: string, values: Array<string>, search_bar: number): Path;

    /**
     * Creates a new dropdown at the designated path and then returns the registered path.
     * @param path The path to the dropdown.
     * @param name The dropdown's name.
     * @param values The dropdown's values.
     * @param search_bar Whether or not the dropdown should contain a search bar.
     * @see {@link https://www.onetap.com/resources/197/| Official Onetap Documentation}
     */
    function AddDropdown(path: Path, name: string, values: Array<string>, search_bar: number): Path;

    /**
     * Creates a new hotkey and at the designated path and then returns the registered path.
     * @param path The path to the hotkey. Can only be inside a hotkey list.
     * @param name The hotkey's name.
     * @param display_name The hotkey's display name, shown in the keybind list.
     * @see {@link https://www.onetap.com/resources/196/| Official Onetap Documentation}
     */
    function AddHotkey(path: Path, name: string, display_name: string): Path;

    /**
     * Creates a new integer slider at the designated path and then returns the registered path.
     * @param path The path to the slider.
     * @param name The slider's name.
     * @param min The minimum value of the slider.
     * @param max The maximum value of the slider.
     * @see {@link https://www.onetap.com/resources/194/| Official Onetap Documentation}
     */
    function AddSliderInt(path: Path, name: string, min: number, max: number): Path;

    /**
     * Creates a new float slider at the designated path and then returns the registered path.
     * @param path The path to the slider.
     * @param name The slider's name.
     * @param min The minimum value of the slider.
     * @param max The maximum value of the slider.
     * @see {@link https://www.onetap.com/resources/195/| Official Onetap Documentation}
     */
    function AddSliderFloat(path: Path, name: string, min: number, max: number): Path;

    /**
     * Creates a new checkbox at the designated path and then returns the registered path.
     * @param path The path to the checkbox.
     * @param name The checkbox's name.
     * @see {@link https://www.onetap.com/resources/193/| Official Onetap Documentation}
     */
    function AddCheckbox(path: Path, name: string): Path;

    /**
     * Overrides the value of a menu element. Used in everything except color-pickers, hotkeys and textboxes.
     * @param path The path to the element.
     * @param value The new value.
     * @see {@link https://www.onetap.com/resources/192/| Official Onetap Documentation}
     */
    function SetValue(path: Path, value: number): Path;

    /**
     * Gets the value of a menu element and returns it.
     * @param path The path to the element.
     * @see {@link https://www.onetap.com/resources/190/| Official Onetap Documentation}
     */
    function GetValue(path: Path): number;

    /**
     * Gets the value of a element in a string form. Used mainly on textboxes.
     * @param path The path to the element.
     * @see {@link https://www.onetap.com/resources/189/| Official Onetap Documentation}
     */
    function GetString(path: Path): string;

    /**
     * Gets the color of a color-picker and returns it.
     * @param path The path to the color-picker.
     * @see {@link https://www.onetap.com/resources/188/| Official Onetap Documentation}
     */
    function GetColor(path: Path): Array<number>;

    /**
     * Gets all menu element's within a certain path and return them.
     * @param path The path to the container.
     * @see {@link https://www.onetap.com/resources/191/| Official Onetap Documentation}
     */
    function GetChildren(path: Path): Array<string>;

    /**
     * @returns Whether or not the cheat's menu is open.
     * @see {@link https://www.onetap.com/resources/52/| Official Onetap Documentation}
     */
    function IsMenuOpen(): boolean;

    /**
     * Overrides a menu element's visibility.
     * @param path The path to the element.
     * @param visible Whether or not the element should be visible.
     * @see {@link https://www.onetap.com/resources/43/| Official Onetap Documentation}
     */
    function SetEnabled(path: Path, visible: number): void;
}

/**
 * @see {@link https://www.onetap.com/scripting/categories/3/| Official Onetap Documentation}
 */
declare namespace Entity {
    /**
     * @returns An array with all entities in the server.
     * @see {@link https://www.onetap.com/resources/16/| Official Onetap Documentation}
     */
    function GetEntities(): Array<EntityID>;

    /**
     * @returns An array with all players in the server.
     * @see {@link https://www.onetap.com/resources/17/| Official Onetap Documentation}
     */
    function GetPlayers(): Array<EntityID>;

    /**
     * @returns An array with all enemies in the server.
     * @see {@link https://www.onetap.com/resources/18/| Official Onetap Documentation}
     */
    function GetEnemies(): Array<EntityID>;

    /**
     * @returns An array with all teammates in the server.
     * @see {@link https://www.onetap.com/resources/19/| Official Onetap Documentation}
     */
    function GetTeammates(): Array<EntityID>;

    /**
     * @returns The entity ID of the local player.
     * @see {@link https://www.onetap.com/resources/20/| Official Onetap Documentation}
     */
    function GetLocalPlayer(): EntityID;

    /**
     * @param index The user's index.
     * @returns The entity index of the entity equivalent to the specified user index.
     * @see {@link https://www.onetap.com/resources/21/| Official Onetap Documentation}
     */
    function GetEntityFromUserID(index: UserID): EntityID;

    /**
     * @param index The entity's index.
     * @returns Whether or not the specified entity is a teammate.
     * @see {@link https://www.onetap.com/resources/22/| Official Onetap Documentation}
     */
    function IsTeammate(index: EntityID): boolean;

    /**
     * @param index The entity's index.
     * @returns Whether or not the specified entity is an enemy.
     * @see {@link https://www.onetap.com/resources/23/| Official Onetap Documentation}
     */
    function IsEnemy(index: EntityID): boolean;

    /**
     * @param index The entity's index.
     * @returns Whether or not the specified entity is ourselves.
     * @see {@link https://www.onetap.com/resources/24/| Official Onetap Documentation}
     */
    function IsLocalPlayer(index: EntityID): boolean;

    /**
     * @param index The entity's index.
     * @returns Whether or not the specified entity is valid.
     * @see {@link https://www.onetap.com/resources/25/| Official Onetap Documentation}
     */
    function IsValid(index: EntityID): boolean;

    /**
     * @param index The entity's index.
     * @returns Whether or not the specified entity is alive.
     * @see {@link https://www.onetap.com/resources/26/| Official Onetap Documentation}
     */
    function IsAlive(index: EntityID): boolean;

    /**
     * @param index The entity's index.
     * @returns Whether or not the specified entity is dormant to our player.
     * @see {@link https://www.onetap.com/resources/27/| Official Onetap Documentation}
     */
    function IsDormant(index: EntityID): boolean;

    /**
     * @param index The entity's index
     * @returns Whether or not the specified entity is a bot.
     * @see {@link https://www.onetap.com/resources/71/| Official Onetap Documentation}
     */
    function IsBot(index: EntityID): boolean;

    /**
     * @param index The entity's index
     * @returns The entity's class identifier.
     * @see {@link https://www.onetap.com/resources/28/| Official Onetap Documentation}
     */
    function GetClassID(index: EntityID): number;

    /**
     * @param index The entity's index
     * @returns The entity's class name.
     * @see {@link https://www.onetap.com/resources/29/| Official Onetap Documentation}
     */
    function GetClassName(index: EntityID): string;

    /**
     * @param index The entity's index
     * @returns The entity's name.
     * @see {@link https://www.onetap.com/resources/30/| Official Onetap Documentation}
     */
    function GetName(index: EntityID): string;

    /**
     * @param index The entity's index
     * @returns The entity's origin position.
     * @see {@link https://www.onetap.com/resources/31/| Official Onetap Documentation}
     */
    function GetRenderOrigin(index: EntityID): Vector;

    /**
     * @param index The entity's index
     * @returns The entity's eye position.
     * @see {@link https://www.onetap.com/resources/76/| Official Onetap Documentation}
     */
    function GetEyePosition(index: EntityID): Vector;

    /**
     * @param index The entity's index
     * @param hitbox_index The hitbox's index. Ranges from 0 to 18.
     * @returns The hitbox's position of an entity.
     * @see {@link https://www.onetap.com/resources/77/| Official Onetap Documentation}
     */
    function GetHitboxPosition(index: EntityID, hitbox_index: HitboxIndex): Vector;

    /**
     * Gets a property from an entity. @returns property's name on failure.
     * @param index The entity's index
     * @param table The property's table
     * @param prop The property's name
     * @see {@link https://www.onetap.com/resources/32/| Official Onetap Documentation}
     */
    function GetProp(index: EntityID, table: string, prop: string): any;

    /**
     * Overrides a property of an entity. Cannot be used on players.
     * @param index The entity's index
     * @param table The property's table
     * @param prop The property's name
     * @param value The new value
     * @see {@link https://www.onetap.com/resources/33/| Official Onetap Documentation}
     */
    function SetProp(index: EntityID, table: string, prop: string, value: any): any;

    /**
     * @returns The weapon's entity index of a player.
     * @param index The player's index
     * @returns Weapon's entity ID
     * @see {@link https://www.onetap.com/resources/70/| Official Onetap Documentation}
     */
    function GetWeapon(index: EntityID): EntityID;

    /**
     * @returns An array containing all of the weapon's entity indexes of a player.
     * @param index The player's index you want to get the weapons from.
     * @see {@link https://www.onetap.com/resources/151/| Official Onetap Documentation}
     */
    function GetWeapons(index: EntityID): Array<EntityID>;

    /**
     * @returns The game's CCSGameRulesProxy entity.
     * @see {@link https://www.onetap.com/resources/72/| Official Onetap Documentation}
     */
    function GetGameRulesProxy(): EntityID;

    /**
     * @param class_index The class' index.
     * @returns An array containing all entities of a certain class.
     * @see {@link https://www.onetap.com/resources/87/| Official Onetap Documentation}
     */
    function GetEntitiesByClassID(class_index: number): Array<EntityID>;

    /**
     * @param {EntityID} index The entity's index
     * @returns An array containing the data of a entity's bounding box: whether or not the box is valid, the box's top left corner X position,
     * the box's top left Y position, the box's bottom right X position and the box's bottom right Y position.
     * @see {@link https://www.onetap.com/resources/161/| Official Onetap Documentation}
     */
    function GetRenderBox(index: EntityID): Array<number>;

    /**
     * @param index The player's or weapon's index.
     * @returns An object containing all the info of a given weapon.
     * @see {@link https://www.onetap.com/resources/212/| Official Onetap Documentation}
     */
    function GetCCSWeaponInfo(index: EntityID): Object;

    /**
     * Adds a flag to a player's flag list, for one tick.
     * @param index The player's index.
     * @param flag The flag text.
     * @param color The flag's color.
     * @see {@link https://www.onetap.com/resources/213/| Official Onetap Documentation}
     */
    function DrawFlag(index: EntityID, flag: string, color: Array<number>): void;

    /**
     * Disables all ESP on a player, for one tick. Does not affect chams.
     * @param index The player's index.
     * @see {@link https://www.onetap.com/resources/224/| Official Onetap Documentation}
     */
    function DisableESP(index: EntityID): void;

    /**
     * @param index The player's index.
     * @returns A players's STEAM64 identification.
     * @see {@link https://www.onetap.com/resources/229/| Official Onetap Documentation}
     */
    function GetSteamID(index: EntityID): number;

    /**
     * @param index The player's index.
     * @param layer The animation layer index.
     * @returns A players's STEAM64 identification.
     * @see {@link https://www.onetap.com/resources/252/| Official Onetap Documentation}
     */
    function GetAnimationLayer(index: EntityID, layer: AnimationLayerIndex): AnimationLayer;
}

/**
 * @see {@link https://www.onetap.com/scripting/categories/4/| Official Onetap Documentation}
 */
declare namespace Render {
    /**
     * Renders a line.
     * @param {number} x1 The first X position
     * @param {number} y1 The first Y position
     * @param {number} x2 The second X position
     * @param {number} y2 The second Y position
     * @param {Array<number>} color The line's color
     * @see {@link https://www.onetap.com/resources/35/| Official Onetap Documentation}
     */
    function Line(x1: number, y1: number, x2: number, y2: number, color: Array<number>): void;

    /**
     * Renders a rectangle outline.
     * @param {number} x The X position
     * @param {number} y The Y position
     * @param {number} w The rectangle's width
     * @param {number} h The rectangle's height
     * @param {Array<number>} color The rectangle's color
     * @see {@link https://www.onetap.com/resources/36/| Official Onetap Documentation}
     */
    function Rect(x: number, y: number, w: number, h: number, color: Array<number>): void;

    /**
     * Renders a rectangle.
     * @param {number} x The X position.
     * @param {number} y The Y position.
     * @param {number} w The rectangle's width.
     * @param {number} h The rectangle's height.
     * @param {Array<number>} color The rectangle's color.
     * @see {@link https://www.onetap.com/resources/37/| Official Onetap Documentation}
     */
    function FilledRect(x: number, y: number, w: number, h: number, color: Array<number>): void;

    /**
     * Renders a ring.
     * @param {number} x The X position
     * @param {number} y The Y position
     * @param {number} radius The circle's radius
     * @param {Array<number>} color The circle's color
     * @see {@link https://www.onetap.com/resources/38/| Official Onetap Documentation}
     */
    function Circle(x: number, y: number, radius: number, color: Array<number>): void;

    /**
     * Renders a circle.
     * @param {number} x The X position
     * @param {number} y The Y position
     * @param {number} radius The circle's radius
     * @param {Array<number>} color The circle's color
     * @see {@link https://www.onetap.com/resources/150/| Official Onetap Documentation}
     */
    function FilledCircle(x: number, y: number, radius: number, color: Array<number>): void;

    /**
     * Renders a gradient.
     * @param {number} x The X position
     * @param {number} y The Y position
     * @param {number} w The gradient's width
     * @param {number} h The gradient's height
     * @param {number} is_horizontal The gradient's direction. Use '0' for vertical and '1' for horizontal.
     * @param {Array<number>} color1 The gradient's first color
     * @param {Array<number>} color2 The gradient's second color
     * @see {@link https://www.onetap.com/resources/80/| Official Onetap Documentation}
     */
    function GradientRect(x: number, y: number, w: number, h: number, is_horizontal: number, color1: Array<number>, color2: Array<number>): void;

    /**
     * Renders a rectangle with a texture.
     * @param {number} x The X position
     * @param {number} y The Y position
     * @param {number} w The rectangle's width
     * @param {number} h The rectangle's height
     * @param {number} texture_index The rectangle's texture index
     * @see {@link https://www.onetap.com/resources/109/| Official Onetap Documentation}
     */
    function TexturedRect(x: number, y: number, w: number, h: number, texture_index: number): void;

    /**
     * Renders a string.
     * @param {number} x The X position
     * @param {number} y The Y position
     * @param {number} centered Whether or not it should be centered.
     * @param {string} text The actual string
     * @param {Array<number>} color The string's color
     * @param {number} font The string's font. Onetap has predefined fonts from 1 to 7.
     * @see {@link https://www.onetap.com/resources/204/| Official Onetap Documentation}
     */
    function String(x: number, y: number, centered: number, text: string, color: Array<number>, font: number): void;

    /**
     * Renders a polygon.
     * @param {Array<Array<number>>} points A matrix of all 3 points of the polygon.
     * @param {Array<number>} color The polygon's color.
     * @see {@link https://www.onetap.com/resources/84/| Official Onetap Documentation}
     */
    function Polygon(points: Array<Array<number>>, color: Array<number>): void;

    /**
     * Convers a 3D point into a 2D point on your screen and returns its X and Y positions, and whether or not the point is behind you.
     * @param {Vector} point The 3D point
     * @see {@link https://www.onetap.com/resources/39/| Official Onetap Documentation}
     */
    function WorldToScreen(point: Vector): Array<number>;

    /**
     * @returns The width and height of your screen.
     * @see {@link https://www.onetap.com/resources/40/| Official Onetap Documentation}
     */
    function GetScreenSize(): Array<number>;

    /**
     * Finds an already existing font by its parameters.
     * @param {string} font The font's name
     * @param {number} size The font's size
     * @param {boolean} windows The font is installed into the windows font directory.
     * @returns The font identifier.
     * @see {@link https://www.onetap.com/resources/238/| Official Onetap Documentation}
     */
    function GetFont(font: string, size: number, windows: boolean): number;

    /**
     * Creates a new texture from a on-disk file.
     * @file .bmp, .dds, .dib, .hdr, .jpg, .pfm, .png, .ppm and .tga.
     * @param {string} path The file's path relative to CSGO's folder.
     * @see {@link https://www.onetap.com/resources/108/| Official Onetap Documentation}
     */
    function AddTexture(path: string): number;

    /**
     * @returns The width and height of a string.
     * @param {string} text The actual string.
     * @param {number} font The string's font.
     * @see {@link https://www.onetap.com/resources/205/| Official Onetap Documentation}
     */
    function TextSize(text: string, font: number): Array<number>;
}

/**
 * @see {@link https://www.onetap.com/scripting/categories/6/| Official Onetap Documentation}
 */
declare namespace Convar {
    /**
     * Gets a CVar's value in integer form.
     * @param cvar The CVar.
     * @see {@link https://www.onetap.com/resources/53/| Official Onetap Documentation}
     */
    function GetInt(cvar: string): number | boolean;

    /**
     * Gets a CVar's value in float form.
     * @param cvar The CVar.
     * @see {@link https://www.onetap.com/resources/55/| Official Onetap Documentation}
     */
    function GetFloat(cvar: string): number | boolean;

    /**
     * Gets a CVar's value in string form.
     * @param cvar The CVar.
     * @see {@link https://www.onetap.com/resources/57/| Official Onetap Documentation}
     */
    function GetString(cvar: string): string | boolean;

    /**
     * Overrides a CVar's value to a specified integer.
     * @param cvar The CVar.
     * @see {@link https://www.onetap.com/resources/54/| Official Onetap Documentation}
     */
    function SetInt(cvar: string, value: number): void;

    /**
     * Overrides a CVar's value to a specified float.
     * @param cvar The CVar.
     * @see {@link https://www.onetap.com/resources/56/| Official Onetap Documentation}
     */
    function SetFloat(cvar: string, value: number): void;

    /**
     * Overrides a CVar's value to a specified string.
     * @param cvar The CVar.
     * @see {@link https://www.onetap.com/resources/58/| Official Onetap Documentation}
     */
    function SetString(cvar: string, value: string): void;
}

/**
 * @see {@link https://www.onetap.com/scripting/categories/7/| Official Onetap Documentation}
 */
declare namespace Event {
    /**
     * Gets a field's value in integer form.
     * @param field_name The field.
     * @see {@link https://www.onetap.com/resources/60/| Official Onetap Documentation}
     */
    function GetInt(field_name: string): number;

    /**
     * Gets a field's value in float form.
     * @param field_name The field.
     * @see {@link https://www.onetap.com/resources/61/| Official Onetap Documentation}
     */
    function GetFloat(field_name: string): number;

    /**
     * Gets a field's value in string form.
     * @param field_name The field.
     * @see {@link https://www.onetap.com/resources/62/| Official Onetap Documentation}
     */
    function GetString(field_name: string): string;
}

/**
 * @see {@link https://www.onetap.com/scripting/categories/9/| Official Onetap Documentation}
 */
declare namespace Trace {
    /**
     * Traces a line from a point to another and returns its data.
     * @param skip_entity The entity to be ignored
     * @param from The initial position
     * @param to The ending position
     * @returns The entity index of a hit entity or undefined, the fraction of the trace ('0' means it hit immediately, '1' means it went fully through).
     * @see {@link https://www.onetap.com/resources/78/| Official Onetap Documentation}
     */
    function Line(skip_entity: EntityID, from: Vector, to: Vector): Array<number>;

    /**
     * Traces a bullet from a point to another and returns its data.
     * @param attacker The entity who attacked
     * @param victim The enttiy who should be hit
     * @param from The initial position
     * @param to The ending position
     * @returns The entity index of a hit entity or undefined, the damage dealt, whether or not the ending position is visible and the hitbox that was hit.
     * @see {@link https://www.onetap.com/resources/79/| Official Onetap Documentation}
     */
    function Bullet(attacker: EntityID, victim: EntityID, from: Vector, to: Vector): Array<number>;

    /**
     * Traces a line from a point to another with a custom mask and returns its data. For advanced users only.
     * @param skip_entity The entity to be ignored
     * @param from The initial position
     * @param to The ending position
     * @param mask The custom mask
     * @param type The type. '0' will trace everything, '1' will trace only the world and '2' will trace only the entities.
     * @returns The entity index of a hit entity or undefined, the fraction of the trace ('0' means it hit immediately, '1' means it went fully through).
     * @see {@link https://www.onetap.com/resources/187/| Official Onetap Documentation}
     */
    function RawLine(skip_entity: EntityID, from: Vector, to: Vector, mask: number, type: number): Array<number>;

    /**
     * @returns Whether or not a line goes through a smoke. Breaks if smoke is removed.
     * @param from The initial position
     * @param to The ending position
     * @see {@link https://www.onetap.com/resources/179/| Official Onetap Documentation}
     */
    function Smoke(from: Vector, to: Vector): number;
}

/**
 * @see {@link https://www.onetap.com/scripting/categories/10/| Official Onetap Documentation}
 */
declare namespace UserCMD {
    /**
     * @returns An array containing forward, sideways and up movement.
     * @see {@link https://www.onetap.com/resources/186/| Official Onetap Documentation}
     */
    function GetMovement(): Array<number>;

    /**
     * @returns a bit-mask of all buttons.
     * @see {@link https://www.onetap.com/resources/181/| Official Onetap Documentation}
     */
    function GetButtons(): number;

    /**
     * Overrides the UserCMD's movement.
     * @param values 
     * @see {@link https://www.onetap.com/resources/89/| Official Onetap Documentation}
     */
    function SetMovement(values: Array<number>): void;

    /**
     * Overrides the UserCMD's buttons.
     * @param buttons
     * @see {@link https://www.onetap.com/resources/182/| Official Onetap Documentation}
     */
    function SetButtons(buttons: number): void;

    /**
     * Overrides your UserCMD's angles.
     * @param angles The new angles
     * @param silent Whether or not you should visualize those angles.
     * @see {@link https://www.onetap.com/resources/185/| Official Onetap Documentation}
     */
    function SetViewAngles(angles: Vector, silent: boolean): void;

    /**
     * Overrides the mouse's X position.
     * @param x The new position.
     * @see {@link https://www.onetap.com/resources/231/| Official Onetap Documentation}
     */
    function SetMouseX(x: number): void;

    /**
     * Overrides the mouse's Y position.
     * @param y The new position.
     * @see {@link https://www.onetap.com/resources/232/| Official Onetap Documentation}
     */
    function SetMouseY(y: number): void;

    /**
     * Forces the cheat to choke a tick.
     * @see {@link https://www.onetap.com/resources/183/| Official Onetap Documentation}
     */
    function Choke(): void;

    /**
     * Forces the cheat to send a tick.
     * @see {@link https://www.onetap.com/resources/184/| Official Onetap Documentation}
     */
    function Send(): void;
}

/**
 * @see {@link https://www.onetap.com/scripting/categories/11/| Official Onetap Documentation}
 */
declare namespace Sound {
    /**
     * Plays a sound.
     * @param path The path to the sound file.
     * @see {@link https://www.onetap.com/resources/82/| Official Onetap Documentation}
     */
    function Play(path: string): void;

    /**
     * Plays a sound on your in-game microphone.
     * @param path The path to the sound file.
     * @see {@link https://www.onetap.com/resources/99/| Official Onetap Documentation}
     */
    function PlayMicrophone(path: string): void;

    /**
     * Stops playing a sound on your microphone.
     * @see {@link https://www.onetap.com/resources/100/| Official Onetap Documentation}
     */
    function StopMicrophone(): void;
}

/**
 * @see {@link https://www.onetap.com/scripting/categories/12/| Official Onetap Documentation}
 */
declare namespace Local {
    /**
     * @returns your latency/ping in seconds.
     * @see {@link https://www.onetap.com/resources/13/| Official Onetap Documentation}
     */
    function Latency(): number;

    /**
     * @returns a vector containing your pitch, yaw and roll.
     * @see {@link https://www.onetap.com/resources/15/| Official Onetap Documentation}
     */
    function GetViewAngles(): Vector;

    /**
     * @returns a vector containing your camera's pitch, yaw and roll.
     * @see {@link https://www.onetap.com/resources/223/| Official Onetap Documentation}
     */
    function GetCameraAngles(): Vector;

    /**
     * @returns a vector containing your camera's X, Y and Z positions.
     * @see {@link https://www.onetap.com/resources/222/| Official Onetap Documentation}
     */
    function GetCameraPosition(): Vector;

    /**
     * @returns Whether or not the local player is dormant to an entity.
     * @see {@link https://www.onetap.com/resources/248/| Official Onetap Documentation}
     */
    function IsDormantTo(index: EntityID): boolean;

    /**
     * Overrides your engine's view angles.
     * @param angles The new angles
     * @see {@link https://www.onetap.com/resources/15/| Official Onetap Documentation}
     */
    function SetViewAngles(angles: Vector): void;

    /**
     * Overrides your camera's angles.
     * @param angles The new angles
     * @see {@link https://www.onetap.com/resources/221/| Official Onetap Documentation}
     */
    function SetCameraAngles(angles: Vector): void;

    /**
     * Overrides your camera's position.
     * @param point The new position.
     * @see {@link https://www.onetap.com/resources/220/| Official Onetap Documentation}
     */
    function SetCameraPosition(point: Vector): void;

    /**
     * Overrides your clan-tag.
     * @param tag The new clan-tag.
     * @see {@link https://www.onetap.com/resources/102/| Official Onetap Documentation}
     */
    function SetClanTag(tag: string): void;

    /**
     * @returns your real anti-aim yaw.
     * @see {@link https://www.onetap.com/resources/104/| Official Onetap Documentation}
     */
    function GetRealYaw(): number;

    /**
     * @returns your fake anti-aim yaw.
     * @see {@link https://www.onetap.com/resources/105/| Official Onetap Documentation}
     */
    function GetFakeYaw(): number;

    /**
     * @returns your fake anti-aim yaw.
     * @see {@link https://www.onetap.com/resources/259/| Official Onetap Documentation}
     */
    function GetMaxDesync(): number;

    /**
     * Gets your weapon's spread.
     * @see {@link https://www.onetap.com/resources/106/| Official Onetap Documentation}
     */
    function GetSpread(): number;

    /**
     * Gets your weapon's inaccuracy.
     * @see {@link https://www.onetap.com/resources/107/| Official Onetap Documentation}
     */
    function GetInaccuracy(): number;
}

/**
 * @see {@link https://www.onetap.com/scripting/categories/13/| Official Onetap Documentation}
 */
declare namespace Cheat {
    /**
     * Prints a message to the console.
     * @param msg The message
     * @see {@link https://www.onetap.com/resources/3/| Official Onetap Documentation}
     */
    function Print(msg: string): void;

    /**
     * Prints a log message like native onetap logs.
     * @param msg The message
     * @param color The color the log message should be printed as.
     * @see {@link https://www.onetap.com/resources/240/| Official Onetap Documentation}
     */
    function PrintLog(msg: string, color: Array<number>): void;

    /**
     * Prints a colored message to the console.
     * @param color The color
     * @param msg The message
     * @see {@link https://www.onetap.com/resources/4/| Official Onetap Documentation}
     */
    function PrintColor(color: Array<number>, msg: string): void;

    /**
     * Prints a message to the in-game chat. Client-sided.
     * @param msg The message
     * @see {@link https://www.onetap.com/resources/85/| Official Onetap Documentation}
     */
    function PrintChat(msg: string): void;

    /**
     * Executes a console command.
     * @param cmd The command
     * @see {@link https://www.onetap.com/resources/5/| Official Onetap Documentation}
     */
    function ExecuteCommand(cmd: string): void;

    /**
     * Register a new callback
     * @param callback The callback's name
     * @param fun The function's name
     * @see {@link https://www.onetap.com/resources/6/| Official Onetap Documentation}
     */
    function RegisterCallback(callback: string, fun: string): void;

    /**
     * @returns The user's name.
     * @see {@link https://www.onetap.com/resources/101/| Official Onetap Documentation}
     */
    function GetUsername(): string;

    /**
     * @returns Whether or not the Legit tab has a configuration for the specified item ID.
     * @param item_id The weapon's item index. 
     * @example Cheat.IsLegitConfigActive( Entity.GetProp( weapon, "CBaseAttributableItem", "m_iItemDefinitionIndex" ) & 0xFFFF );
     * @see {@link https://www.onetap.com/resources/216/| Official Onetap Documentation}
     */
    function IsLegitConfigActive(item_id: number): boolean;

    /**
     * @returns Whether or not the Rage tab has a configuration for the specified item ID.
     * @param item_id The weapon's item index. 
     * @example Cheat.IsRageConfigActive( Entity.GetProp( weapon, "CBaseAttributableItem", "m_iItemDefinitionIndex" ) & 0xFFFF );
     * @see {@link https://www.onetap.com/resources/215/| Official Onetap Documentation}
     */
    function IsRageConfigActive(item_id: number): boolean;
}

/**
 * @see {@link https://www.onetap.com/scripting/categories/14/| Official Onetap Documentation}
 */
declare namespace Input {
    /**
     * @returns Whether or not a key is being held.
     * @param vkey_code The virtual-key code.
     * @see {@link https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes| List of VK codes}
     * @see {@link https://www.onetap.com/resources/7/| Official Onetap Documentation}
     */
    function IsKeyPressed(vkey_code: number): boolean;

    /**
     * @returns The X and Y positions of the cursor.
     * @see {@link https://www.onetap.com/resources/59/| Official Onetap Documentation}
     */
    function GetCursorPosition(): Array<number>;

    /**
     * Toggles the visibility of the cursor.
     * @param visible Whether or not it is visible. 
     * @see {@link https://www.onetap.com/resources/208/| Official Onetap Documentation}
     */
    function ForceCursor(visible: number): void;

    /**
     * @returns Whether or not the csgo console is open.
     * @see {@link https://www.onetap.com/resources/251/| Official Onetap Documentation}
     */
    function IsConsoleOpen(): boolean;

    /**
     * @returns Whether or not the csgo chat window is open.
     * @see {@link https://www.onetap.com/resources/250/| Official Onetap Documentation}
     */
    function IsChatOpen(): boolean;
}

/**
 * Allows scripts to utilize the grenade prediction which the cheat uses to visualize grenades predicted trajectories.
 * @see {@link https://www.onetap.com/scripting/categories/26/| Official Onetap Documentation}
 */
declare namespace GrenadePrediction {
    /** 
     * @returns An array of predicted grenade objects, all of which are live.
     * @see {@link https://www.onetap.com/resources/247/| Official Onetap Documentation}
     */
    function GetLiveGrenades(): Array<PredictedGrenade>;

    /** 
     * @returns The local players predicted grenade, returns undefined if none.
     * @see {@link https://www.onetap.com/resources/246/| Official Onetap Documentation}
     */
    function GetPredictedGrenade(): PredictedGrenade | undefined;

    /**
     * Must be called every tick to remain active, you can call it in the draw thread, 
     * there is no performance impact when calling it, 
     * must be called in order for grenade prediction to predict (if the user has it disabled).
     * @see {@link https://www.onetap.com/resources/245/| Official Onetap Documentation}
     */
    function Run(): void;
}

/**
 * Allows scripts to change the internal functioning of the Autostop feature.
 * @see {@link https://www.onetap.com/scripting/categories/25/| Official Onetap Documentation}
 */
declare namespace Autostop {
    /**
     * Forces autostop retreating.
     * @see {@link https://www.onetap.com/resources/243/| Official Onetap Documentation}
     */
    function ForceRetreat(): void;

    /**
     * @returns The state of retreating.
     * @see {@link https://www.onetap.com/resources/242/| Official Onetap Documentation}
     */
    function IsRetreating(): boolean;

    /**
     * @returns The state of peeking.
     * @see {@link https://www.onetap.com/resources/241/| Official Onetap Documentation}
     */
    function IsAutoPeeking(): boolean;
}

/**
 * @see {@link https://www.onetap.com/scripting/categories/15/| Official Onetap Documentation}
 */
declare namespace World {
    /**
     * @returns The server's IP.
     * @see {@link https://www.onetap.com/resources/103/| Official Onetap Documentation}
     */
    function GetServerString(): string;

    /**
     * @returns The current map's name.
     * @see {@link https://www.onetap.com/resources/65/| Official Onetap Documentation}
     */
    function GetMapName(): string;

    /**
     * Used to get the index of a model in game world.
     * @param {string} model_path The on-disk path to the model.
     * @returns The model's index.
     * @see {@link https://www.onetap.com/resources/244/| Official Onetap Documentation}
     */
    function GetModelIndex(model_path: string): number;

    /**
     * Creates a lighting strike at a specified position.
     * @param {boolean} sound Whether or not to play audio.
     * @param {Vector} position The position in the world to spawn the lightning strike.
     * @see {@link https://www.onetap.com/resources/249/| Official Onetap Documentation}
     */
    function CreateLightningStrike(sound: boolean, position: Vector): void;
}

/**
 * Allows scripts to alter the anti-aim of the cheat programmatically.
 * @see {@link https://www.onetap.com/scripting/categories/24/| Official Onetap Documentation}
 */
declare namespace AntiAim {
    /**
     * @returns Whether or not the anti-aim is being overriden.
     * @see {@link https://www.onetap.com/resources/127/| Official Onetap Documentation}
     */
    function GetOverride(): boolean;

    /**
     * Starts/stops overriding the anti-aim.
     * @param active Whether or not the override is active.
     * @see {@link https://www.onetap.com/resources/126/| Official Onetap Documentation}
     */
    function SetOverride(active: number): void;

    /**
     * Overrides your real (body) offset.
     * @param offset The new offset.
     * @see {@link https://www.onetap.com/resources/129/| Official Onetap Documentation}
     */
    function SetRealOffset(offset: number): void;

    /**
     * Overrides your fake (yaw) offset.
     * @param offset The new offset.
     * @see {@link https://www.onetap.com/resources/128/| Official Onetap Documentation}
     */
    function SetFakeOffset(offset: number): void;

    /**
     * Overrides your LBY (desync) offset.
     * @param offset The new offset.
     * @see {@link https://www.onetap.com/resources/130/| Official Onetap Documentation}
     */
    function SetLBYOffset(offset: number): void;
}

/**
 * Allows scripts to alter the cheats internal functioning of tick based exploits.
 * @see {@link https://www.onetap.com/scripting/categories/18/| Official Onetap Documentation}
 */
declare namespace Exploit {
    /**
     * @returns a fraction representing how much of the exploit is charged. '0' means it's completely uncharged and '1' means it's fully charged.
     * @see {@link https://www.onetap.com/resources/152/| Official Onetap Documentation}
     */
    function GetCharge(): number;

    /**
     * Forces the cheat to recharge.
     * @see {@link https://www.onetap.com/resources/153/| Official Onetap Documentation}
     */
    function Recharge(): void;

    /**
     * Enables the cheat's automatic recharging.
     * @see {@link https://www.onetap.com/resources/155/| Official Onetap Documentation}
     */
    function EnableRecharge(): void;

    /**
     * Disables the cheat's automatic recharging.
     * @see {@link https://www.onetap.com/resources/154/| Official Onetap Documentation}
     */
    function DisableRecharge(): void;

    /**
     * Overrides the exploit's shift amount.
     * @param amount The new amount. The maximum recommended amount is 15.
     * @see {@link https://www.onetap.com/resources/177/| Official Onetap Documentation}
     */
    function OverrideShift(amount: number): void;

    /**
     * Overrides the exploit's tolerance amount.
     * @param amount The new amount. The minimum amount is 1.
     * @see {@link https://www.onetap.com/resources/178/| Official Onetap Documentation}
     */
    function OverrideTolerance(amount: number): void;
}

/**
 * Allows scripts to tune the ragebot programmatically.
 * @see {@link https://www.onetap.com/scripting/categories/19/| Official Onetap Documentation}
 */
declare namespace Ragebot {
    /**
     * @returns The current ragebot target. This only returns an entity right before shooting, so most of the
     * time it'll just return undefined.
     * @see {@link https://www.onetap.com/resources/167/| Official Onetap Documentation}
     */
    function GetTarget(): EntityID;

    /**
     * @returns An array containing all possible ragebot targets.
     * @see {@link https://www.onetap.com/resources/217/| Official Onetap Documentation}
     */
    function GetTargets(): Array<EntityID>;

    /**
     * @returns The hitchance of the ragebot's target.
     * @see {@link https://www.onetap.com/resources/218/| Official Onetap Documentation}
     */
    function GetTargetHitchance(): number;

    /**
     * Forces the ragebot to prioritize a certain player.
     * @param index The entity's index
     * @see {@link https://www.onetap.com/resources/169/| Official Onetap Documentation}
     */
    function ForceTarget(index: EntityID): void;

    /**
     * Forces the ragebot to ignore a player.
     * @param index The entity's index
     * @see {@link https://www.onetap.com/resources/174/| Official Onetap Documentation}
     */
    function IgnoreTarget(index: EntityID): void;

    /**
     * Forces the ragebot to ignore a hitbox on a specific player.
     * @param index The entity's index
     * @param hitbox The hitbox's index
     * @see {@link https://www.onetap.com/resources/219/| Official Onetap Documentation}
     */
    function IgnoreTargetHitbox(index: EntityID, hitbox: number): void;

    /**
     * Forces the ragebot to target only safe points on a player.
     * @param index The entity's index
     * @see {@link https://www.onetap.com/resources/170/| Official Onetap Documentation}
     */
    function ForceTargetSafety(index: EntityID): void;

    /**
     * Forces the ragebot to target a player for a certain hitchance.
     * @param index The entity's index
     * @param hitchance The new hitchance
     * @see {@link https://www.onetap.com/resources/171/| Official Onetap Documentation}
     */
    function ForceTargetHitchance(index: EntityID, hitchance: number): void;

    /**
     * Forces the ragebot to target a player for a certain min. damage.
     * @param index The entity's index
     * @param dmg The new min. damage
     * @see {@link https://www.onetap.com/resources/172/| Official Onetap Documentation}
     */
    function ForceTargetMinimumDamage(index: EntityID, dmg: number): void;

    /**
     * Forces the ragebot to target only safe points for a specific hitbox.
     * @param hitbox The hitbox's index
     * @see {@link https://www.onetap.com/resources/173/| Official Onetap Documentation}
     */
    function ForceHitboxSafety(hitbox: number): void;
}

/**
 * Allows scripts to manipulate game materials.
 * @see {@link https://www.onetap.com/scripting/categories/20/| Official Onetap Documentation}
 */
declare namespace Material {
    /**
     * Creates a new material and returns true on success.
     * @param name The material's name
     * @see {@link https://www.onetap.com/resources/162/| Official Onetap Documentation}
     */
    function Create(name: string): boolean;

    /**
     * Deletes an existing material and returns true on success.
     * @param name The material's name
     * @see {@link https://www.onetap.com/resources/163/| Official Onetap Documentation}
     */
    function Destroy(name: string): boolean;

    /**
     * Gets an existing material by the name and returns its index.
     * @param name The material's name
     * @see {@link https://www.onetap.com/resources/164/| Official Onetap Documentation}
     */
    function Get(name: string): number;

    /**
     * Overrides a material shader's value and returns true on success. Can only be called in 'Material' callback.
     * @param {number} index The material's index
     * @param {string} shader The shader's name
     * @param {string} value The shader's value
     * @see {@link https://www.onetap.com/resources/165/| Official Onetap Documentation}
     */
    function SetKeyValue(index: number, shader: string, value: string): boolean;

    /**
     * Applies changes to a material and returns true on success. Can only be called in 'Material' callback.
     * @param {number} index The material's index
     * @see {@link https://www.onetap.com/resources/166/| Official Onetap Documentation}
     */
    function Refresh(index: number): boolean;

    /**
     * Sets key values of an overriden material 
     * @param {string} material The material's name.
     * @param {string} key The key's name.
     * @param {string} value The shader's value.
     * @see {@link https://www.onetap.com/resources/255/| Official Onetap Documentation}
     */
    function SetProxyKeyValue(material: string, key: string, value: string): void;

    /**
     * Creates a proxy to override material properties .
     * @param {string} material The material's name.
     * @see {@link https://www.onetap.com/resources/253/| Official Onetap Documentation}
     */
    function CreateProxy(material: string): void;

    /**
     * Destroys the proxy for a material.
     * @param {string} material The material's name.
     * @see {@link https://www.onetap.com/resources/254/| Official Onetap Documentation}
     */
    function DestroyProxy(material: string): void;

    /**
     * Applies the modified key values to the material.
     * @param {string} material The material's name.
     * @see {@link https://www.onetap.com/resources/256/| Official Onetap Documentation}
     */
    function RefreshProxy(material: string): void;

    /**
     * @returns {string} The material at your crosshair.
     * @see {@link https://www.onetap.com/resources/258/| Official Onetap Documentation}
     */
    function GetMaterialAtCrosshair(): string;

    /**
     * Creates a proxy for the original material using the new material as an override.
     * @param {string} original_material The original material's name.
     * @param {string} material The material that will be used instead of the original material.
     * @see {@link https://www.onetap.com/resources/257/| Official Onetap Documentation}
     */
    function Replace(original_material: string, material: string): void;
}

/**
 * Allows scripts to create new renderable views of the game world.
 * @see {@link https://www.onetap.com/scripting/categories/23/| Official Onetap Documentation}
 */
declare namespace View {
    /**
     * Creates a new view object and returns its index.
     * @returns The view object index.
     * @see {@link https://www.onetap.com/resources/225/| Official Onetap Documentation}
     */
    function Create(): number;

    /**
     * Updates the view with the specified resolution, position and angles. Can only be called in 'FRAME_RENDER_START' callback.
     * @param index The view's index
     * @param w The width of the image
     * @param h The height of the image
     * @param origin The camera position
     * @param angles The camera angles
     * @see {@link https://www.onetap.com/resources/226/| Official Onetap Documentation}
     */
    function Update(index: number, w: number, h: number, origin: Vector, angles: Vector): void;

    /**
     * Renders a rectangle representing the image the view last captured.
     * @param index The view's index
     * @param x The X position
     * @param y The Y position
     * @param w The rectangle's width
     * @param h The rectangle's height
     * @see {@link https://www.onetap.com/resources/227/| Official Onetap Documentation}
     */
    function Render(index: number, x: number, y: number, w: number, h: number): void;

    /**
     * Converts a 3D point into a 2D point on your screen relative to the view's camera position and angles.
     * @param index The view's index
     * @param point The 3D point
     * @returns The translated 2D point on your screen.
     * @see {@link https://www.onetap.com/resources/228/| Official Onetap Documentation}
     */
    function WorldToScreen(index: number, point: Vector): Array<number>;
}

/**
 * Allows scripts to persist data through an on-disk key value database.
 * @see {@link https://www.onetap.com/scripting/categories/24/| Official Onetap Documentation}
 */
declare namespace DataFile {
    /**
     * Saves all current cached keys/values to a specific file.
     * @param {string} file The file's name
     * @see {@link https://www.onetap.com/resources/234/| Official Onetap Documentation}
     */
    function Save(file: string): void;

    /**
     * Loads all keys/values from a specific file.
     * @param {string} file The file's name
     * @see {@link https://www.onetap.com/resources/235/| Official Onetap Documentation}
     */
    function Load(file: string): void;

    /**
     * Gets a value from a specific file.
     * @param {string} file The file's name
     * @param {string} key The key
     * @see {@link https://www.onetap.com/resources/237/| Official Onetap Documentation}
     */
    function GetKey(file: string, key: string): string;

    /**
     * Assigns a value to a specific key in a specific file and caches it for saving.
     * @param {string} file The file's name
     * @param {string} key The key
     * @param {string} value The value
     * @see {@link https://www.onetap.com/resources/236/| Official Onetap Documentation}
     */
    function SetKey(file: string, key: string, value: string): void;

    /**
     * Erases a key in a datafile.
     * @param {string} file The file's name
     * @param {string} key The key to delete.
     * @see {@link https://www.onetap.com/resources/239/| Official Onetap Documentation}
     */
    function EraseKey(file: string, key: string): void;
}

export { Cheat, World, DataFile, Convar, UserCMD, UI, Entity, Exploit, View, Event, Sound, Material, Ragebot, AntiAim, Input, Local, Trace, Render, Globals, GrenadePrediction, Autostop };