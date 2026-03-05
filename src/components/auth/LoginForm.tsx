import { useAuth } from '@/context/AuthContext';
import { useForm } from '@/hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/common/Input';
import { useMemo, useState } from 'react';
import { getMessage } from '@/services/translationService';

export function LoginForm() {
    const { login, isLoading } = useAuth();
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const { values, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
        useForm({
            initialValues: { identifier: '', password: '' },
            onSubmit: async (values) => {
                try {
                    const response = await login(values.identifier, values.password);

                    if (!response?.user) {
                        setError(getMessage(response.error));
                    }

                    navigate('/');
                } catch (err: any) {
                    setError(getMessage('MSG-LOGIN-INTERNAL-ERROR'));
                }
            },
        });

    const disableSubmitButton = useMemo(() => {
        return isSubmitting || isLoading || !values.identifier || !values.password;
    }, [isSubmitting, isLoading, values]);

    return (
        <div className="min-h-screen max-w-lg mx-auto flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full">
                <h1 className="text-2xl font-bold text-center mb-6">
                    ログイン情報
                </h1>
                <div className="mb-4">
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                    <Input
                        label="アカウントID"
                        id="identifier"
                        name="identifier"
                        value={values.identifier}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="アカウントID"
                        disabled={isSubmitting || isLoading}
                        touched={touched.identifier}
                    />

                    <Input
                        label="ログイン情報"
                        type="password"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="ログイン情報"
                        disabled={isSubmitting || isLoading}
                        touched={touched.password}
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                        disabled={disableSubmitButton}
                    >
                        確認
                    </button>
                </form>
            </div>
        </div>
    );
}
