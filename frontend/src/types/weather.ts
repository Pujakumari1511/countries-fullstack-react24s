export interface WeatherMain {
    temperature: Number;
    feels_like: Number;
    humidity: Number;
}

export interface WeatherCondition {
    description: string;
    icon: string;
}

export interface WeatherWind {
    speed: Number;
}

export interface WeatherData {
    main: WeatherMain;
    weather: WeatherCondition;
    wind: WeatherWind;
}

export interface WeatherState {
    data: WeatherData | null;
    loading: boolean;
    error: string | null;
}