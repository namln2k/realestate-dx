import { useAuth } from '@/context/AuthContext';
import { useForm } from '@/hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/common/Input';
import { Loading } from '@/components/common/Loading';
import toast from 'react-hot-toast';

export function LoginForm() {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
        useForm({
            initialValues: { identifier: '', password: '' },
            onSubmit: async (values) => {
                // TODO: Handle login success and failure
                try {
                    const response = await login(values.identifier, values.password);

                    if (!response?.user) {
                        toast.error(response.message || '');
                        return;
                    }

                    navigate('/');
                } catch (err: any) {
                    toast.error(err.message || '')
                }
            },
        });

    return (
        <div className="min-h-screen max-w-lg mx-auto flex items-center justify-center">
            {(isLoading || isSubmitting) && <Loading fullScreen message="Logging in..." />}
            <div className="bg-white p-8 rounded-lg shadow-md w-full">
                <h1 className="text-2xl font-bold text-center mb-6">
                    ログイン情報
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="アカウントID"
                        id="identifier"
                        name="identifier"
                        value={values.identifier}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="アカウントID"
                        disabled={isSubmitting || isLoading}
                        error={errors.identifier}
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
                        error={errors.password}
                        touched={touched.password}
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
                        disabled={isSubmitting || isLoading}
                    >
                        確認
                    </button>
                </form>
            </div>
        </div>
    );
}
