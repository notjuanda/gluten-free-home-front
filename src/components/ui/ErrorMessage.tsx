interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className="bg-destructive/20 text-destructive p-3 rounded-md my-4 text-center font-medium">
        {message}
        </div>
    );
}
