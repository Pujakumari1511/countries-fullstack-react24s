export interface Main {
    temp: Number;
    feels_like: Number;
    humidity: Number;
}

export interface Condition {
    description: string;
    icon: string;
}

export interface Wind {
    speed: Number;
}

export interface Weather {
    main: Main;
    weather: Condition[];
    wind: Wind;
}

export interface WeatherState {
    weather: Weather | null;
    loading: boolean;
    error: string | null;
}