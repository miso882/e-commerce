<?php

namespace App\Controller;

use App\Entity\Payment;
use App\Repository\PaymentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Stripe\ApiOperations\Request;
use Stripe\Charge;
use Stripe\Stripe;
use Symfony\Component\HttpFoundation\Request as Req;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class PaymentController extends AbstractController
{
    #[Route('/api/payment', name: "payment", methods: ['POST'])]
    public function stripeCheckout(
        EntityManagerInterface $em,
        Req $request,
        SerializerInterface $serializer,
        UrlGeneratorInterface $urlGenerator): JsonResponse{
        $content = $request->toArray();
        $stripeSecretKey = 'sk_test_51NiDmCInFRDdeEbElX4IF3xC376nxJdk4WFRnWo5l4F1RmOe0Lot9zh7V5ZQAuknCu5RbC6YhMDCDCuf3qOgja9D00m2L1xqLf';
        $stripe = new \Stripe\StripeClient($stripeSecretKey);
        $paymentIntent = $stripe->paymentIntents->create([
            'amount' => $content["amount"],
            'currency' => 'EUR',
            'automatic_payment_methods' => [
                'enabled' => true,
            ],
        ]);
        $output = [
            'clientSecret' => $paymentIntent->client_secret,
        ];
        return new JsonResponse($output, Response::HTTP_OK, []);
    }

    #[Route('/api/paymentinseration', name: "payment_inseration", methods: ['POST'])]
    public function paymentsucceeded(Req $request, 
        SerializerInterface $serializer,
        EntityManagerInterface $em,
        UrlGeneratorInterface $urlGenerator): JsonResponse{
        $payment = $serializer->deserialize($request->getContent(), Payment::class, 'json');
        $em->persist($payment);
        $em->flush();
        return new JsonResponse("data inserted", Response::HTTP_OK, []);

    }
    #[Route('/api/paymentdisplay', name: "payment_display", methods: ['GET'])]
    public function paymentdisplay(Req $request, SerializerInterface $serializer,EntityManagerInterface $em,PaymentRepository $paymentRepository,UrlGeneratorInterface $urlGenerator): JsonResponse
    {
        $paymentList = $paymentRepository->findAll();
        $jsonpaymentList = $serializer->serialize($paymentList, 'json');
        return new JsonResponse($jsonpaymentList, Response::HTTP_OK, []);

    }
}
