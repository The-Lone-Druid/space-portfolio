'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Mail, Send, TestTube, CheckCircle, AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

const testEmailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  type: z.literal('password-reset'),
})

type TestEmailForm = z.infer<typeof testEmailSchema>

interface EmailConfigStatus {
  service: string
  configured: boolean
  from: string
}

export function EmailTestingCard() {
  const [isLoading, setIsLoading] = useState(false)
  const [configStatus, setConfigStatus] = useState<EmailConfigStatus | null>(
    null
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TestEmailForm>({
    resolver: zodResolver(testEmailSchema),
    defaultValues: {
      type: 'password-reset',
    },
  })

  const watchedType = watch('type')

  const checkEmailConfig = async () => {
    try {
      // This would be a simple endpoint to check email configuration
      const emailService = process.env.NEXT_PUBLIC_EMAIL_SERVICE || 'console'
      const emailFrom =
        process.env.NEXT_PUBLIC_EMAIL_FROM || 'noreply@space-portfolio.com'

      setConfigStatus({
        service: emailService,
        configured: emailService !== 'console',
        from: emailFrom,
      })
    } catch (error) {
      console.error('Failed to check email config:', error)
    }
  }

  const onSubmit = async (data: TestEmailForm) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Test email sent successfully!', {
          description: result.message,
        })
      } else {
        toast.error('Failed to send test email', {
          description: result.error || 'Please check your configuration',
        })
      }
    } catch (error) {
      console.error('Test email error:', error)
      toast.error('An error occurred', {
        description: 'Please try again later',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkEmailConfig()
  }, [])

  return (
    <Card className='glass-cosmic'>
      <CardHeader>
        <div className='flex items-center space-x-2'>
          <TestTube className='text-primary h-5 w-5' />
          <CardTitle>Email Configuration Test</CardTitle>
        </div>
        <CardDescription>
          Test your email service configuration by sending test emails
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Configuration Status */}
        {configStatus && (
          <div className='space-y-3 rounded-lg border p-4'>
            <h4 className='flex items-center gap-2 font-medium'>
              <Mail className='h-4 w-4' />
              Current Configuration
            </h4>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground text-sm'>Service:</span>
                <Badge
                  variant={configStatus.configured ? 'default' : 'secondary'}
                >
                  {configStatus.service}
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground text-sm'>Status:</span>
                <div className='flex items-center gap-1'>
                  {configStatus.configured ? (
                    <>
                      <CheckCircle className='h-3 w-3 text-green-500' />
                      <span className='text-xs text-green-600'>Configured</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className='h-3 w-3 text-yellow-500' />
                      <span className='text-xs text-yellow-600'>
                        Development
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground text-sm'>From:</span>
                <span className='bg-muted rounded px-2 py-1 font-mono text-xs'>
                  {configStatus.from}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Test Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Test Email Address</Label>
              <Input
                id='email'
                type='email'
                placeholder='test@example.com'
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className='text-destructive text-sm'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='type'>Email Type</Label>
              <Select
                value={watchedType}
                onValueChange={value =>
                  setValue('type', value as 'password-reset')
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select email type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='password-reset'>Password Reset</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className='text-destructive text-sm'>
                  {errors.type.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type='submit'
            className='w-full sm:w-auto'
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className='border-background border-t-foreground mr-2 h-4 w-4 animate-spin rounded-full border-2' />
                Sending Test Email...
              </>
            ) : (
              <>
                <Send className='mr-2 h-4 w-4' />
                Send Test Email
              </>
            )}
          </Button>
        </form>

        {/* Instructions */}
        <div className='rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20'>
          <h4 className='mb-2 font-medium text-blue-900 dark:text-blue-100'>
            Setup Instructions:
          </h4>
          <ul className='space-y-1 text-sm text-blue-700 dark:text-blue-300'>
            <li>
              • Add your Resend API key to{' '}
              <code className='rounded bg-blue-100 px-1 dark:bg-blue-900'>
                RESEND_API_KEY
              </code>
            </li>
            <li>
              • Set{' '}
              <code className='rounded bg-blue-100 px-1 dark:bg-blue-900'>
                EMAIL_SERVICE=resend
              </code>
            </li>
            <li>
              • Configure{' '}
              <code className='rounded bg-blue-100 px-1 dark:bg-blue-900'>
                EMAIL_FROM
              </code>{' '}
              with your verified domain
            </li>
            <li>
              • Test emails will use a demo token (not functional reset links)
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
